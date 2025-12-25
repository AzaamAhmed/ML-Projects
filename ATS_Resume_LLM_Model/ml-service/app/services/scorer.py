"""
ATS Scoring Service
Calculates comprehensive ATS scores based on multiple factors
"""

from typing import Dict, List, Optional
from app.models.schemas import (
    ParsedResume, JobDescription, ATSScore, RecommendationStatus, MatchResult
)


class ScorerService:
    """Service for calculating ATS scores"""
    
    WEIGHTS = {
        'skills': 0.40,
        'experience': 0.30,
        'education': 0.15,
        'keywords': 0.10,
        'format': 0.05
    }
    
    HIRE_THRESHOLD = 80
    REVIEW_THRESHOLD = 60
    
    def calculate_ats_score(
        self,
        parsed_resume: ParsedResume,
        job_description: Optional[JobDescription] = None,
        match_result: Optional[MatchResult] = None
    ) -> ATSScore:
        """Calculate comprehensive ATS score"""
        skills_score = self._calc_skills(parsed_resume, job_description, match_result)
        experience_score = self._calc_experience(parsed_resume, job_description)
        education_score = self._calc_education(parsed_resume, job_description)
        keyword_score = self._calc_keywords(parsed_resume, match_result)
        format_score = self._calc_format(parsed_resume)
        
        overall_score = (
            skills_score * self.WEIGHTS['skills'] +
            experience_score * self.WEIGHTS['experience'] +
            education_score * self.WEIGHTS['education'] +
            keyword_score * self.WEIGHTS['keywords'] +
            format_score * self.WEIGHTS['format']
        )
        
        recommendation = self._get_recommendation(overall_score)
        confidence = min(1.0, 0.7 + (0.1 if len(parsed_resume.skills) >= 5 else 0))
        
        return ATSScore(
            overall_score=round(overall_score, 1),
            skills_score=round(skills_score, 1),
            experience_score=round(experience_score, 1),
            education_score=round(education_score, 1),
            keyword_score=round(keyword_score, 1),
            format_score=round(format_score, 1),
            score_breakdown={
                'Skills (40%)': round(skills_score * self.WEIGHTS['skills'], 1),
                'Experience (30%)': round(experience_score * self.WEIGHTS['experience'], 1),
                'Education (15%)': round(education_score * self.WEIGHTS['education'], 1),
                'Keywords (10%)': round(keyword_score * self.WEIGHTS['keywords'], 1),
                'Format (5%)': round(format_score * self.WEIGHTS['format'], 1)
            },
            recommendation=recommendation,
            confidence=round(confidence, 2)
        )
    
    def _calc_skills(self, resume, jd, match_result) -> float:
        if match_result:
            return match_result.skill_match_percentage
        num_skills = len(resume.skills)
        if num_skills >= 15: return 95
        elif num_skills >= 10: return 85
        elif num_skills >= 5: return 70
        return 50
    
    def _calc_experience(self, resume, jd) -> float:
        years = resume.total_experience_years
        if jd and jd.min_experience_years:
            if years >= jd.min_experience_years: return 100
            return max(0, 100 - (jd.min_experience_years - years) * 20)
        if years >= 5: return 95
        elif years >= 3: return 85
        elif years >= 1: return 70
        return 50
    
    def _calc_education(self, resume, jd) -> float:
        if not resume.education: return 50
        degrees = [edu.degree.lower() for edu in resume.education]
        if any('ph.d' in d for d in degrees): return 100
        elif any('master' in d for d in degrees): return 90
        elif any('bachelor' in d for d in degrees): return 80
        return 60
    
    def _calc_keywords(self, resume, match_result) -> float:
        if match_result:
            return min(100, match_result.semantic_similarity * 120)
        return 75 if resume.summary else 60
    
    def _calc_format(self, resume) -> float:
        score = 80
        if resume.summary: score += 5
        if len(resume.experience) >= 2: score += 10
        if resume.certifications: score += 5
        return min(100, score)
    
    def _get_recommendation(self, score: float) -> RecommendationStatus:
        if score >= self.HIRE_THRESHOLD: return RecommendationStatus.HIRE
        elif score >= self.REVIEW_THRESHOLD: return RecommendationStatus.REVIEW
        return RecommendationStatus.REJECT


scorer_service = ScorerService()
