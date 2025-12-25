"""
Matching Router - API endpoints for JD-Resume matching
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from app.services.matcher import matcher_service
from app.services.resume_parser import resume_parser
from app.models.schemas import JobDescription, MatchResult, KeywordGap, CandidateRanking

router = APIRouter()


class MatchRequest(BaseModel):
    resume_text: str
    job_description: JobDescription


class MatchResponse(BaseModel):
    success: bool
    match_result: MatchResult
    keyword_gaps: KeywordGap


class RankCandidatesRequest(BaseModel):
    resume_texts: List[str]
    job_description: JobDescription


@router.post("/match", response_model=MatchResponse)
async def match_resume_to_job(request: MatchRequest):
    """Match a resume against a job description"""
    try:
        parsed = resume_parser.parse_resume(request.resume_text)
        match_result = matcher_service.match_resume_to_job(
            parsed, request.job_description
        )
        keyword_gaps = matcher_service.analyze_keyword_gaps(
            request.resume_text,
            request.job_description.description
        )
        
        return MatchResponse(
            success=True,
            match_result=match_result,
            keyword_gaps=keyword_gaps
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/keywords")
async def analyze_keywords(resume_text: str, jd_text: str):
    """Analyze keyword gaps between resume and JD"""
    try:
        gaps = matcher_service.analyze_keyword_gaps(resume_text, jd_text)
        return {"success": True, "keyword_gaps": gaps}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/rank")
async def rank_candidates(request: RankCandidatesRequest):
    """Rank multiple candidates for a job"""
    try:
        candidates = []
        for i, text in enumerate(request.resume_texts):
            parsed = resume_parser.parse_resume(text)
            candidates.append({
                "id": f"CAND-{i+1:03d}",
                "parsed_resume": parsed
            })
        
        ranked = matcher_service.rank_candidates(
            candidates, request.job_description
        )
        
        rankings = []
        for c in ranked:
            rankings.append(CandidateRanking(
                candidate_id=c["id"],
                name=c["parsed_resume"].anonymized_name,
                rank=c["rank"],
                ats_score=c["match_result"].match_score,
                match_score=c["match_result"].skill_match_percentage,
                recommendation=c["match_result"].match_score >= 80 and "Hire" or 
                              (c["match_result"].match_score >= 60 and "Review" or "Reject"),
                top_skills=[s.name for s in c["parsed_resume"].skills[:5]],
                experience_years=c["parsed_resume"].total_experience_years
            ))
        
        return {"success": True, "rankings": rankings}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Sample job descriptions
SAMPLE_JOBS = [
    JobDescription(
        job_id="JOB-001",
        title="Junior Data Scientist",
        description="Looking for a Junior Data Scientist to join our analytics team",
        required_skills=["Python", "Pandas", "Machine Learning", "Statistics", "SQL"],
        preferred_skills=["TensorFlow", "Tableau", "AWS"],
        min_experience_years=1,
        max_experience_years=3,
        education_requirements=["Bachelor's in Computer Science", "Statistics"]
    ),
    JobDescription(
        job_id="JOB-002",
        title="Senior ML Engineer",
        description="Senior ML Engineer role for building production ML systems",
        required_skills=["Python", "TensorFlow", "PyTorch", "MLOps", "Docker"],
        preferred_skills=["Kubernetes", "AWS", "GCP"],
        min_experience_years=4,
        education_requirements=["Master's in Computer Science", "Machine Learning"]
    ),
    JobDescription(
        job_id="JOB-003",
        title="Full Stack Developer",
        description="Full Stack Developer for our product team",
        required_skills=["React", "Node.js", "TypeScript", "PostgreSQL"],
        preferred_skills=["Next.js", "GraphQL", "Docker"],
        min_experience_years=3,
        education_requirements=["Bachelor's in Computer Science"]
    )
]


@router.get("/sample-jobs")
async def get_sample_jobs():
    """Get sample job descriptions"""
    return {"jobs": SAMPLE_JOBS}
