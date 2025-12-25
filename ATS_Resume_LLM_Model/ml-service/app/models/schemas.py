"""
Pydantic Models for ATS Resume Checker ML Service
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from enum import Enum


class RecommendationStatus(str, Enum):
    """Shortlisting recommendation status"""
    HIRE = "Hire"
    REVIEW = "Review"
    REJECT = "Reject"


class Skill(BaseModel):
    """Skill model with proficiency level"""
    name: str
    category: str = "technical"  # technical, soft, tool
    proficiency: Optional[str] = None  # beginner, intermediate, advanced, expert


class Education(BaseModel):
    """Education history entry"""
    degree: str
    field: str
    institution: str
    year: Optional[int] = None
    gpa: Optional[float] = None


class Experience(BaseModel):
    """Work experience entry"""
    title: str
    company: str
    duration: str
    years: float
    description: Optional[str] = None
    skills_used: List[str] = []


class Certification(BaseModel):
    """Certification entry"""
    name: str
    issuer: str
    year: Optional[int] = None
    valid: bool = True


class ParsedResume(BaseModel):
    """Parsed resume data structure"""
    # Anonymized personal info for bias-free screening
    candidate_id: str
    anonymized_name: str  # e.g., "Candidate A"
    
    # Core resume data
    skills: List[Skill] = []
    education: List[Education] = []
    experience: List[Experience] = []
    certifications: List[Certification] = []
    
    # Extracted metadata
    total_experience_years: float = 0.0
    primary_role: Optional[str] = None
    summary: Optional[str] = None
    
    # Original data (optional, for non-anonymized mode)
    original_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None


class JobDescription(BaseModel):
    """Job description for matching"""
    job_id: str
    title: str
    description: str
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    min_experience_years: float = 0.0
    max_experience_years: Optional[float] = None
    education_requirements: List[str] = []
    department: Optional[str] = None


class MatchResult(BaseModel):
    """JD-Resume matching result"""
    match_score: float = Field(..., ge=0, le=100)
    skill_match_percentage: float = Field(..., ge=0, le=100)
    experience_match: bool
    education_match: bool
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    extra_skills: List[str] = []
    semantic_similarity: float = Field(..., ge=0, le=1)


class ATSScore(BaseModel):
    """Comprehensive ATS scoring result"""
    overall_score: float = Field(..., ge=0, le=100)
    
    # Component scores
    skills_score: float = Field(..., ge=0, le=100)
    experience_score: float = Field(..., ge=0, le=100)
    education_score: float = Field(..., ge=0, le=100)
    keyword_score: float = Field(..., ge=0, le=100)
    format_score: float = Field(..., ge=0, le=100)
    
    # Breakdown
    score_breakdown: Dict[str, float] = {}
    
    # Recommendation
    recommendation: RecommendationStatus
    confidence: float = Field(..., ge=0, le=1)


class KeywordGap(BaseModel):
    """Keyword gap analysis result"""
    missing_keywords: List[str] = []
    present_keywords: List[str] = []
    keyword_density: float = 0.0
    optimization_level: str = "low"  # low, medium, high


class Suggestion(BaseModel):
    """Resume improvement suggestion"""
    category: str  # skills, format, keywords, experience, education
    priority: str  # high, medium, low
    title: str
    description: str
    action_items: List[str] = []


class ResumeAnalysisRequest(BaseModel):
    """Request for full resume analysis"""
    resume_text: str
    job_description: Optional[str] = None
    job_id: Optional[str] = None
    anonymize: bool = True


class ResumeAnalysisResponse(BaseModel):
    """Complete resume analysis response"""
    parsed_resume: ParsedResume
    ats_score: ATSScore
    match_result: Optional[MatchResult] = None
    keyword_gaps: KeywordGap
    suggestions: List[Suggestion] = []
    processing_time_ms: float


class CandidateRanking(BaseModel):
    """Candidate ranking for a job"""
    candidate_id: str
    name: str
    rank: int
    ats_score: float
    match_score: float
    recommendation: RecommendationStatus
    top_skills: List[str] = []
    experience_years: float


class ResumeRewriteRequest(BaseModel):
    """Request for resume rewriting suggestions"""
    resume_text: str
    target_job_description: str
    style: str = "professional"  # professional, creative, technical


class ResumeRewriteResponse(BaseModel):
    """Resume rewriting response"""
    improved_sections: Dict[str, str] = {}
    keyword_additions: List[str] = []
    format_suggestions: List[str] = []
    ats_score_improvement: float
