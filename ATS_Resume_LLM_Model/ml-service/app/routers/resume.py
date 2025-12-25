"""
Resume Router - API endpoints for resume parsing and analysis
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import time

from app.services.resume_parser import resume_parser
from app.services.scorer import scorer_service
from app.services.matcher import matcher_service
from app.services.suggestions import suggestions_service
from app.models.schemas import (
    ParsedResume, ResumeAnalysisRequest, ResumeAnalysisResponse,
    JobDescription
)

router = APIRouter()


class ResumeParseRequest(BaseModel):
    resume_text: str
    anonymize: bool = True


class ResumeParseResponse(BaseModel):
    success: bool
    parsed_resume: ParsedResume
    processing_time_ms: float


@router.post("/parse", response_model=ResumeParseResponse)
async def parse_resume(request: ResumeParseRequest):
    """Parse a resume and extract structured information"""
    start_time = time.time()
    
    try:
        parsed = resume_parser.parse_resume(
            request.resume_text, 
            anonymize=request.anonymize
        )
        
        processing_time = (time.time() - start_time) * 1000
        
        return ResumeParseResponse(
            success=True,
            parsed_resume=parsed,
            processing_time_ms=round(processing_time, 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze", response_model=ResumeAnalysisResponse)
async def analyze_resume(request: ResumeAnalysisRequest):
    """Full resume analysis with scoring and suggestions"""
    start_time = time.time()
    
    try:
        # Parse resume
        parsed = resume_parser.parse_resume(
            request.resume_text,
            anonymize=request.anonymize
        )
        
        # Create job description if provided
        job_description = None
        match_result = None
        
        if request.job_description:
            job_description = JobDescription(
                job_id="JD-TEMP",
                title="Target Position",
                description=request.job_description,
                required_skills=[],
                min_experience_years=0
            )
            match_result = matcher_service.match_resume_to_job(parsed, job_description)
        
        # Calculate ATS score
        ats_score = scorer_service.calculate_ats_score(
            parsed, job_description, match_result
        )
        
        # Analyze keyword gaps
        keyword_gaps = matcher_service.analyze_keyword_gaps(
            request.resume_text,
            request.job_description or ""
        )
        
        # Generate suggestions
        suggestions = suggestions_service.generate_suggestions(
            parsed, job_description, keyword_gaps, match_result
        )
        
        processing_time = (time.time() - start_time) * 1000
        
        return ResumeAnalysisResponse(
            parsed_resume=parsed,
            ats_score=ats_score,
            match_result=match_result,
            keyword_gaps=keyword_gaps,
            suggestions=suggestions,
            processing_time_ms=round(processing_time, 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Sample resumes for testing
SAMPLE_RESUMES = {
    "ml_engineer": """
Ayaan Perera
ML Engineer | ayaan.perera@email.com | +1-555-0123

PROFESSIONAL SUMMARY
Experienced Machine Learning Engineer with 3.2 years of experience in developing 
and deploying ML models. Proficient in Python, TensorFlow, and SQL.

SKILLS
Python, TensorFlow, PyTorch, SQL, Pandas, NumPy, Scikit-learn, 
Machine Learning, Deep Learning, Data Analysis, Git, Docker, AWS

EXPERIENCE
Machine Learning Engineer at TechCorp (2021 - Present)
- Developed and deployed ML models for production
- Improved model accuracy by 25%
- Collaborated with data engineering team

Junior Data Scientist at DataInc (2020 - 2021)
- Built predictive models using Python
- Created data pipelines using SQL

EDUCATION
Master's in Computer Science, Stanford University, 2020
Bachelor's in Mathematics, MIT, 2018

CERTIFICATIONS
AWS Certified Machine Learning Specialty
TensorFlow Developer Certificate
""",
    "data_analyst": """
Priya Sharma
Data Analyst | priya.sharma@email.com

SUMMARY
Data Analyst with 2.5 years experience in data analysis and visualization.

SKILLS
Python, Pandas, SQL, Tableau, Excel, Power BI, Statistics, Data Visualization

EXPERIENCE
Data Analyst at Analytics Co (2022 - Present)
- Created dashboards and reports
- Performed statistical analysis

EDUCATION
Bachelor's in Statistics, UCLA, 2021
"""
}


@router.get("/samples")
async def get_sample_resumes():
    """Get sample resumes for testing"""
    return {
        "available_samples": list(SAMPLE_RESUMES.keys()),
        "samples": SAMPLE_RESUMES
    }


@router.get("/sample/{sample_id}")
async def get_sample_resume(sample_id: str):
    """Get a specific sample resume"""
    if sample_id not in SAMPLE_RESUMES:
        raise HTTPException(status_code=404, detail="Sample not found")
    return {"resume_text": SAMPLE_RESUMES[sample_id]}
