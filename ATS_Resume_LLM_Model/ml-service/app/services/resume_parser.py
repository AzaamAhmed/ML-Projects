"""
Resume Parser Service
Extracts structured information from resume text using NLP techniques
"""

import re
import uuid
from typing import List, Dict, Optional, Tuple
from app.models.schemas import (
    ParsedResume, Skill, Education, Experience, Certification
)


class ResumeParserService:
    """Service for parsing resumes and extracting structured data"""
    
    # Common technical skills database
    TECHNICAL_SKILLS = {
        # Programming Languages
        "python", "javascript", "typescript", "java", "c++", "c#", "ruby", "go", "rust",
        "php", "swift", "kotlin", "scala", "r", "matlab", "perl", "bash", "shell",
        
        # ML/AI
        "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy", "scipy",
        "opencv", "nltk", "spacy", "huggingface", "transformers", "bert", "gpt",
        "machine learning", "deep learning", "neural networks", "nlp", "computer vision",
        
        # Web Development
        "react", "angular", "vue", "next.js", "node.js", "express", "django", "flask",
        "fastapi", "spring", "rails", "laravel", "html", "css", "sass", "tailwind",
        
        # Databases
        "sql", "mysql", "postgresql", "mongodb", "redis", "elasticsearch", "cassandra",
        "dynamodb", "firebase", "sqlite", "oracle", "neo4j",
        
        # Cloud & DevOps
        "aws", "azure", "gcp", "docker", "kubernetes", "terraform", "ansible", "jenkins",
        "gitlab ci", "github actions", "circleci", "prometheus", "grafana",
        
        # Tools
        "git", "jira", "confluence", "figma", "postman", "swagger", "webpack", "vite",
        "jupyter", "vs code", "intellij", "tableau", "power bi", "excel"
    }
    
    SOFT_SKILLS = {
        "leadership", "communication", "teamwork", "problem solving", "critical thinking",
        "time management", "adaptability", "creativity", "collaboration", "project management",
        "agile", "scrum", "mentoring", "presentation", "negotiation", "analytical"
    }
    
    # Education patterns
    DEGREE_PATTERNS = [
        r"(ph\.?d\.?|doctorate|doctor of philosophy)",
        r"(m\.?s\.?|master'?s?|mba|m\.?tech\.?|m\.?e\.?)",
        r"(b\.?s\.?|bachelor'?s?|b\.?tech\.?|b\.?e\.?|b\.?a\.?)",
        r"(associate'?s?|diploma|certification)"
    ]
    
    FIELD_KEYWORDS = {
        "computer science": ["computer science", "cs", "computing", "informatics"],
        "data science": ["data science", "analytics", "data analytics"],
        "engineering": ["engineering", "engineer"],
        "business": ["business", "mba", "management", "administration"],
        "mathematics": ["mathematics", "math", "statistics", "applied math"]
    }
    
    def __init__(self):
        """Initialize the resume parser"""
        self.candidate_counter = 0
    
    def parse_resume(self, resume_text: str, anonymize: bool = True) -> ParsedResume:
        """
        Parse resume text and extract structured information
        
        Args:
            resume_text: Raw resume text
            anonymize: Whether to anonymize personal information
            
        Returns:
            ParsedResume object with extracted data
        """
        # Generate candidate ID
        candidate_id = f"CAND-{uuid.uuid4().hex[:8].upper()}"
        self.candidate_counter += 1
        
        # Extract all components
        name = self._extract_name(resume_text)
        email = self._extract_email(resume_text)
        phone = self._extract_phone(resume_text)
        location = self._extract_location(resume_text)
        
        skills = self._extract_skills(resume_text)
        education = self._extract_education(resume_text)
        experience = self._extract_experience(resume_text)
        certifications = self._extract_certifications(resume_text)
        
        total_experience = self._calculate_total_experience(experience)
        primary_role = self._determine_primary_role(experience, skills)
        summary = self._extract_summary(resume_text)
        
        return ParsedResume(
            candidate_id=candidate_id,
            anonymized_name=f"Candidate {chr(65 + (self.candidate_counter % 26))}" if anonymize else name,
            skills=skills,
            education=education,
            experience=experience,
            certifications=certifications,
            total_experience_years=total_experience,
            primary_role=primary_role,
            summary=summary,
            original_name=name if not anonymize else None,
            email=email if not anonymize else None,
            phone=phone if not anonymize else None,
            location=location if not anonymize else None
        )
    
    def _extract_name(self, text: str) -> str:
        """Extract candidate name from resume"""
        lines = text.strip().split('\n')
        # Usually the name is in the first few lines
        for line in lines[:5]:
            line = line.strip()
            # Skip empty lines and lines that look like headers
            if line and len(line) < 50 and not any(word in line.lower() for word in 
                ['resume', 'cv', 'curriculum', 'email', 'phone', 'address', '@']):
                # Check if it looks like a name (mostly letters and spaces)
                if re.match(r'^[A-Za-z\s\.\-]+$', line) and len(line.split()) <= 4:
                    return line.title()
        return "Unknown Candidate"
    
    def _extract_email(self, text: str) -> Optional[str]:
        """Extract email address from resume"""
        email_pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
        match = re.search(email_pattern, text)
        return match.group(0) if match else None
    
    def _extract_phone(self, text: str) -> Optional[str]:
        """Extract phone number from resume"""
        phone_patterns = [
            r'\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
            r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
        ]
        for pattern in phone_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(0)
        return None
    
    def _extract_location(self, text: str) -> Optional[str]:
        """Extract location from resume"""
        # Look for common location patterns
        location_patterns = [
            r'(?:Location|Address|City):\s*([^\n]+)',
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2})',  # City, State
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Za-z]+)'  # City, Country
        ]
        for pattern in location_patterns:
            match = re.search(pattern, text)
            if match:
                return match.group(1).strip()
        return None
    
    def _extract_skills(self, text: str) -> List[Skill]:
        """Extract skills from resume text"""
        text_lower = text.lower()
        skills = []
        found_skills = set()
        
        # Extract technical skills
        for skill in self.TECHNICAL_SKILLS:
            if skill in text_lower and skill not in found_skills:
                found_skills.add(skill)
                proficiency = self._estimate_proficiency(text_lower, skill)
                skills.append(Skill(
                    name=skill.title() if len(skill) > 3 else skill.upper(),
                    category="technical",
                    proficiency=proficiency
                ))
        
        # Extract soft skills
        for skill in self.SOFT_SKILLS:
            if skill in text_lower and skill not in found_skills:
                found_skills.add(skill)
                skills.append(Skill(
                    name=skill.title(),
                    category="soft",
                    proficiency="intermediate"
                ))
        
        return skills
    
    def _estimate_proficiency(self, text: str, skill: str) -> str:
        """Estimate skill proficiency based on context"""
        # Look for proficiency indicators near the skill mention
        context_window = 100
        skill_pos = text.find(skill)
        if skill_pos == -1:
            return "intermediate"
        
        start = max(0, skill_pos - context_window)
        end = min(len(text), skill_pos + len(skill) + context_window)
        context = text[start:end]
        
        if any(word in context for word in ['expert', 'advanced', 'senior', '5+ years', 'lead']):
            return "expert"
        elif any(word in context for word in ['proficient', '3+ years', 'experienced']):
            return "advanced"
        elif any(word in context for word in ['familiar', 'basic', 'beginner', 'learning']):
            return "beginner"
        return "intermediate"
    
    def _extract_education(self, text: str) -> List[Education]:
        """Extract education history from resume"""
        education_list = []
        text_lower = text.lower()
        
        # Find education section
        education_section = self._find_section(text, ['education', 'academic', 'qualification'])
        if not education_section:
            education_section = text
        
        # Extract degree information
        for degree_pattern in self.DEGREE_PATTERNS:
            matches = re.finditer(degree_pattern, education_section.lower())
            for match in matches:
                # Get surrounding context
                start = max(0, match.start() - 10)
                end = min(len(education_section), match.end() + 200)
                context = education_section[start:end]
                
                # Determine degree and field
                degree_type = self._normalize_degree(match.group(0))
                field = self._extract_field(context)
                institution = self._extract_institution(context)
                year = self._extract_year(context)
                
                education_list.append(Education(
                    degree=degree_type,
                    field=field,
                    institution=institution,
                    year=year
                ))
        
        # Remove duplicates
        seen = set()
        unique_education = []
        for edu in education_list:
            key = (edu.degree, edu.field, edu.institution)
            if key not in seen:
                seen.add(key)
                unique_education.append(edu)
        
        return unique_education[:3]  # Limit to 3 most relevant
    
    def _normalize_degree(self, degree: str) -> str:
        """Normalize degree name"""
        degree = degree.lower().strip()
        if any(x in degree for x in ['ph.d', 'phd', 'doctor']):
            return "Ph.D."
        elif any(x in degree for x in ['m.s', 'master', 'mba', 'm.tech', 'm.e']):
            return "Master's"
        elif any(x in degree for x in ['b.s', 'bachelor', 'b.tech', 'b.e', 'b.a']):
            return "Bachelor's"
        elif 'associate' in degree:
            return "Associate's"
        return degree.title()
    
    def _extract_field(self, context: str) -> str:
        """Extract field of study from context"""
        context_lower = context.lower()
        for field, keywords in self.FIELD_KEYWORDS.items():
            if any(kw in context_lower for kw in keywords):
                return field.title()
        return "General Studies"
    
    def _extract_institution(self, context: str) -> str:
        """Extract institution name from context"""
        # Look for common university patterns
        patterns = [
            r'(?:University|Institute|College|School)\s+(?:of\s+)?[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*',
            r'[A-Z][a-z]+\s+(?:University|Institute|College|School)'
        ]
        for pattern in patterns:
            match = re.search(pattern, context)
            if match:
                return match.group(0)
        return "Unknown Institution"
    
    def _extract_year(self, context: str) -> Optional[int]:
        """Extract graduation year from context"""
        year_pattern = r'20[0-2]\d|19[89]\d'
        match = re.search(year_pattern, context)
        return int(match.group(0)) if match else None
    
    def _extract_experience(self, text: str) -> List[Experience]:
        """Extract work experience from resume"""
        experience_list = []
        
        # Find experience section
        experience_section = self._find_section(text, ['experience', 'employment', 'work history', 'professional'])
        if not experience_section:
            experience_section = text
        
        # Look for job title patterns
        title_patterns = [
            r'(Senior|Junior|Lead|Principal|Staff)?\s*(Software|Data|ML|Machine Learning|Full Stack|Frontend|Backend|DevOps|Cloud|Platform|AI)\s*(Engineer|Developer|Scientist|Analyst|Architect)',
            r'(Project|Product|Program|Engineering)\s*Manager',
            r'(CTO|CEO|VP|Director|Head)\s*(?:of)?\s*\w+'
        ]
        
        # Extract job entries (simplified for mock)
        for pattern in title_patterns:
            matches = re.finditer(pattern, experience_section, re.IGNORECASE)
            for match in matches:
                title = match.group(0).strip()
                
                # Get context around the match
                start = max(0, match.start() - 50)
                end = min(len(experience_section), match.end() + 300)
                context = experience_section[start:end]
                
                # Extract company and duration
                company = self._extract_company(context)
                duration, years = self._extract_duration(context)
                
                experience_list.append(Experience(
                    title=title.title(),
                    company=company,
                    duration=duration,
                    years=years,
                    description=context[:200] if len(context) > 50 else None
                ))
        
        # Remove duplicates and limit
        seen_titles = set()
        unique_experience = []
        for exp in experience_list:
            if exp.title.lower() not in seen_titles:
                seen_titles.add(exp.title.lower())
                unique_experience.append(exp)
        
        return unique_experience[:5]
    
    def _extract_company(self, context: str) -> str:
        """Extract company name from context"""
        # Look for "at Company" or "Company Inc/Ltd/Corp" patterns
        patterns = [
            r'(?:at|@)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)',
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:Inc|Ltd|Corp|LLC|Technologies)'
        ]
        for pattern in patterns:
            match = re.search(pattern, context)
            if match:
                return match.group(1)
        return "Company"
    
    def _extract_duration(self, context: str) -> Tuple[str, float]:
        """Extract duration and calculate years"""
        # Look for date ranges
        date_pattern = r'(\d{4})\s*[-–to]+\s*(\d{4}|present|current)'
        match = re.search(date_pattern, context.lower())
        if match:
            start_year = int(match.group(1))
            end_year = 2024 if match.group(2) in ['present', 'current'] else int(match.group(2))
            years = end_year - start_year
            return f"{match.group(0)}", float(years)
        
        # Look for explicit duration
        duration_pattern = r'(\d+(?:\.\d+)?)\s*(?:\+)?\s*(?:years?|yrs?)'
        match = re.search(duration_pattern, context.lower())
        if match:
            years = float(match.group(1))
            return f"{years} years", years
        
        return "N/A", 1.0
    
    def _extract_certifications(self, text: str) -> List[Certification]:
        """Extract certifications from resume"""
        certifications = []
        
        # Common certification patterns
        cert_patterns = [
            r'(AWS|Azure|GCP|Google Cloud)\s*(Certified|Professional|Associate|Solutions Architect|Developer|Administrator)',
            r'(PMP|CISSP|CCNA|CCNP|CKA|CKAD)',
            r'(Certified|Certificate)\s*(?:in)?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
            r'(TensorFlow|PyTorch|Kubernetes|Docker)\s*(?:Certified|Certification)'
        ]
        
        for pattern in cert_patterns:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                cert_name = match.group(0).strip()
                certifications.append(Certification(
                    name=cert_name,
                    issuer=self._determine_cert_issuer(cert_name),
                    valid=True
                ))
        
        return certifications[:5]
    
    def _determine_cert_issuer(self, cert_name: str) -> str:
        """Determine certification issuer"""
        cert_name_lower = cert_name.lower()
        if 'aws' in cert_name_lower:
            return "Amazon Web Services"
        elif 'azure' in cert_name_lower:
            return "Microsoft"
        elif 'gcp' in cert_name_lower or 'google' in cert_name_lower:
            return "Google"
        elif 'pmp' in cert_name_lower:
            return "PMI"
        elif 'tensorflow' in cert_name_lower:
            return "Google"
        elif 'kubernetes' in cert_name_lower or 'cka' in cert_name_lower:
            return "CNCF"
        return "Issuing Authority"
    
    def _find_section(self, text: str, keywords: List[str]) -> Optional[str]:
        """Find a specific section in the resume"""
        text_lower = text.lower()
        for keyword in keywords:
            pattern = rf'(?:^|\n)\s*{keyword}[:\s]*\n(.*?)(?=\n\s*(?:experience|education|skills|projects|awards|references|$))'
            match = re.search(pattern, text_lower, re.DOTALL | re.IGNORECASE)
            if match:
                start = text_lower.find(keyword)
                end = start + len(match.group(0))
                return text[start:end]
        return None
    
    def _calculate_total_experience(self, experiences: List[Experience]) -> float:
        """Calculate total years of experience"""
        if not experiences:
            return 0.0
        return sum(exp.years for exp in experiences)
    
    def _determine_primary_role(self, experiences: List[Experience], skills: List[Skill]) -> str:
        """Determine the candidate's primary role"""
        if experiences:
            # Use the most recent job title
            return experiences[0].title
        
        # Infer from skills
        skill_names = [s.name.lower() for s in skills]
        if any('ml' in s or 'machine learning' in s or 'data' in s for s in skill_names):
            return "Data/ML Professional"
        elif any('frontend' in s or 'react' in s or 'vue' in s for s in skill_names):
            return "Frontend Developer"
        elif any('backend' in s or 'node' in s or 'python' in s for s in skill_names):
            return "Backend Developer"
        elif any('devops' in s or 'cloud' in s or 'aws' in s for s in skill_names):
            return "DevOps Engineer"
        
        return "Software Professional"
    
    def _extract_summary(self, text: str) -> Optional[str]:
        """Extract professional summary from resume"""
        # Look for summary section
        summary_section = self._find_section(text, ['summary', 'objective', 'profile', 'about'])
        if summary_section:
            # Clean and limit length
            summary = re.sub(r'\s+', ' ', summary_section).strip()
            return summary[:500] if len(summary) > 500 else summary
        return None


# Singleton instance
resume_parser = ResumeParserService()
