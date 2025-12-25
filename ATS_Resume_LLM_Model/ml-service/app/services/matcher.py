"""
JD-Resume Matching Service
Implements semantic matching using TF-IDF and cosine similarity
"""

import re
from typing import List, Dict, Set, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from app.models.schemas import (
    ParsedResume, JobDescription, MatchResult, KeywordGap
)


class MatcherService:
    """Service for matching resumes against job descriptions"""
    
    def __init__(self):
        """Initialize the matcher with TF-IDF vectorizer"""
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),
            max_features=5000,
            lowercase=True
        )
    
    def match_resume_to_job(
        self, 
        parsed_resume: ParsedResume, 
        job_description: JobDescription
    ) -> MatchResult:
        """
        Match a parsed resume against a job description
        
        Args:
            parsed_resume: Parsed resume data
            job_description: Job description to match against
            
        Returns:
            MatchResult with scores and analysis
        """
        # Extract text representations
        resume_text = self._resume_to_text(parsed_resume)
        jd_text = self._jd_to_text(job_description)
        
        # Calculate semantic similarity using TF-IDF
        semantic_similarity = self._calculate_semantic_similarity(resume_text, jd_text)
        
        # Extract and compare skills
        resume_skills = set(skill.name.lower() for skill in parsed_resume.skills)
        required_skills = set(skill.lower() for skill in job_description.required_skills)
        preferred_skills = set(skill.lower() for skill in job_description.preferred_skills)
        all_jd_skills = required_skills | preferred_skills
        
        # Calculate skill matches
        matched_skills = resume_skills & all_jd_skills
        missing_skills = required_skills - resume_skills
        extra_skills = resume_skills - all_jd_skills
        
        # Calculate skill match percentage
        if required_skills:
            skill_match_pct = (len(matched_skills & required_skills) / len(required_skills)) * 100
        else:
            skill_match_pct = len(matched_skills) * 10 if matched_skills else 50
        
        # Check experience match
        experience_match = self._check_experience_match(
            parsed_resume.total_experience_years,
            job_description.min_experience_years,
            job_description.max_experience_years
        )
        
        # Check education match
        education_match = self._check_education_match(
            parsed_resume.education,
            job_description.education_requirements
        )
        
        # Calculate overall match score
        match_score = self._calculate_match_score(
            semantic_similarity,
            skill_match_pct,
            experience_match,
            education_match
        )
        
        return MatchResult(
            match_score=round(match_score, 2),
            skill_match_percentage=round(skill_match_pct, 2),
            experience_match=experience_match,
            education_match=education_match,
            matched_skills=[s.title() for s in matched_skills],
            missing_skills=[s.title() for s in missing_skills],
            extra_skills=[s.title() for s in list(extra_skills)[:10]],
            semantic_similarity=round(semantic_similarity, 4)
        )
    
    def analyze_keyword_gaps(
        self,
        resume_text: str,
        job_description_text: str
    ) -> KeywordGap:
        """
        Analyze keyword gaps between resume and job description
        
        Args:
            resume_text: Raw resume text
            job_description_text: Raw job description text
            
        Returns:
            KeywordGap analysis
        """
        # Extract important keywords from JD
        jd_keywords = self._extract_keywords(job_description_text)
        resume_keywords = self._extract_keywords(resume_text)
        
        # Find gaps
        missing = list(jd_keywords - resume_keywords)
        present = list(jd_keywords & resume_keywords)
        
        # Calculate keyword density
        if jd_keywords:
            density = len(present) / len(jd_keywords)
        else:
            density = 0.0
        
        # Determine optimization level
        if density >= 0.8:
            optimization_level = "high"
        elif density >= 0.5:
            optimization_level = "medium"
        else:
            optimization_level = "low"
        
        return KeywordGap(
            missing_keywords=missing[:20],  # Top 20 missing
            present_keywords=present[:20],  # Top 20 present
            keyword_density=round(density, 2),
            optimization_level=optimization_level
        )
    
    def _resume_to_text(self, parsed_resume: ParsedResume) -> str:
        """Convert parsed resume to text representation"""
        parts = []
        
        # Add summary
        if parsed_resume.summary:
            parts.append(parsed_resume.summary)
        
        # Add primary role
        if parsed_resume.primary_role:
            parts.append(parsed_resume.primary_role)
        
        # Add skills
        for skill in parsed_resume.skills:
            parts.append(skill.name)
        
        # Add experience
        for exp in parsed_resume.experience:
            parts.append(exp.title)
            parts.append(exp.company)
            if exp.description:
                parts.append(exp.description)
        
        # Add education
        for edu in parsed_resume.education:
            parts.append(edu.degree)
            parts.append(edu.field)
            parts.append(edu.institution)
        
        # Add certifications
        for cert in parsed_resume.certifications:
            parts.append(cert.name)
        
        return ' '.join(parts)
    
    def _jd_to_text(self, job_description: JobDescription) -> str:
        """Convert job description to text representation"""
        parts = [
            job_description.title,
            job_description.description,
            ' '.join(job_description.required_skills),
            ' '.join(job_description.preferred_skills),
            ' '.join(job_description.education_requirements)
        ]
        return ' '.join(parts)
    
    def _calculate_semantic_similarity(self, text1: str, text2: str) -> float:
        """Calculate semantic similarity using TF-IDF"""
        try:
            # Fit and transform both texts
            tfidf_matrix = self.vectorizer.fit_transform([text1, text2])
            
            # Calculate cosine similarity
            similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
            
            return float(similarity[0][0])
        except Exception:
            return 0.5  # Default similarity on error
    
    def _check_experience_match(
        self,
        candidate_years: float,
        min_years: float,
        max_years: float = None
    ) -> bool:
        """Check if candidate experience matches requirements"""
        if max_years:
            return min_years <= candidate_years <= max_years
        return candidate_years >= min_years
    
    def _check_education_match(
        self,
        education: List,
        requirements: List[str]
    ) -> bool:
        """Check if candidate education matches requirements"""
        if not requirements:
            return True
        
        if not education:
            return False
        
        # Check if any education matches any requirement
        education_texts = [
            f"{edu.degree} {edu.field}".lower() 
            for edu in education
        ]
        
        for req in requirements:
            req_lower = req.lower()
            for edu_text in education_texts:
                if any(word in edu_text for word in req_lower.split()):
                    return True
        
        return False
    
    def _calculate_match_score(
        self,
        semantic_similarity: float,
        skill_match_pct: float,
        experience_match: bool,
        education_match: bool
    ) -> float:
        """Calculate overall match score (0-100)"""
        # Weighted scoring
        semantic_score = semantic_similarity * 100 * 0.25  # 25% weight
        skill_score = skill_match_pct * 0.40  # 40% weight
        experience_score = 100 * 0.20 if experience_match else 30 * 0.20  # 20% weight
        education_score = 100 * 0.15 if education_match else 50 * 0.15  # 15% weight
        
        total = semantic_score + skill_score + experience_score + education_score
        
        return min(100, max(0, total))
    
    def _extract_keywords(self, text: str) -> Set[str]:
        """Extract important keywords from text"""
        # Clean text
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        
        # Common stop words to exclude
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during',
            'before', 'after', 'above', 'below', 'between', 'under', 'again',
            'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why',
            'how', 'all', 'each', 'few', 'more', 'most', 'other', 'some', 'such',
            'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very',
            's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'we', 'you',
            'your', 'our', 'their', 'this', 'that', 'these', 'those', 'am', 'is',
            'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
            'having', 'do', 'does', 'did', 'doing', 'would', 'could', 'should',
            'might', 'must', 'shall', 'what', 'which', 'who', 'whom', 'years',
            'year', 'experience', 'work', 'working', 'job', 'position', 'role',
            'team', 'company', 'looking', 'seeking', 'required', 'requirements'
        }
        
        # Extract words
        words = text.split()
        keywords = set()
        
        for word in words:
            word = word.strip()
            if len(word) > 2 and word not in stop_words:
                keywords.add(word)
        
        return keywords
    
    def rank_candidates(
        self,
        candidates: List[Dict],
        job_description: JobDescription
    ) -> List[Dict]:
        """
        Rank multiple candidates for a job
        
        Args:
            candidates: List of candidate data with parsed resumes
            job_description: Job to rank against
            
        Returns:
            Sorted list of candidates with rankings
        """
        ranked = []
        
        for candidate in candidates:
            parsed_resume = candidate.get('parsed_resume')
            if parsed_resume:
                match_result = self.match_resume_to_job(parsed_resume, job_description)
                ranked.append({
                    **candidate,
                    'match_result': match_result,
                    'ranking_score': match_result.match_score
                })
        
        # Sort by ranking score
        ranked.sort(key=lambda x: x['ranking_score'], reverse=True)
        
        # Add rank positions
        for i, candidate in enumerate(ranked):
            candidate['rank'] = i + 1
        
        return ranked


# Singleton instance
matcher_service = MatcherService()
