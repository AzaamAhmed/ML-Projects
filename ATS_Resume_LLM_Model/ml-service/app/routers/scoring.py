"""
Scoring Router - API endpoints for ATS scoring
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from app.services.scorer import scorer_service
from app.services.resume_parser import resume_parser
from app.services.matcher import matcher_service
from app.models.schemas import ATSScore, JobDescription

router = APIRouter()


class ScoreRequest(BaseModel):
    resume_text: str
    job_description: Optional[str] = None


class ScoreResponse(BaseModel):
    success: bool
    ats_score: ATSScore


class BatchScoreRequest(BaseModel):
    resume_texts: List[str]
    job_description: Optional[str] = None


@router.post("/score", response_model=ScoreResponse)
async def calculate_ats_score(request: ScoreRequest):
    """Calculate ATS score for a resume"""
    try:
        parsed = resume_parser.parse_resume(request.resume_text)
        
        jd = None
        match_result = None
        if request.job_description:
            jd = JobDescription(
                job_id="TEMP",
                title="Target",
                description=request.job_description,
                required_skills=[],
                min_experience_years=0
            )
            match_result = matcher_service.match_resume_to_job(parsed, jd)
        
        score = scorer_service.calculate_ats_score(parsed, jd, match_result)
        
        return ScoreResponse(success=True, ats_score=score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/batch")
async def batch_score(request: BatchScoreRequest):
    """Calculate ATS scores for multiple resumes"""
    try:
        scores = []
        for text in request.resume_texts:
            parsed = resume_parser.parse_resume(text)
            score = scorer_service.calculate_ats_score(parsed)
            scores.append({
                "candidate_id": parsed.candidate_id,
                "name": parsed.anonymized_name,
                "ats_score": score
            })
        
        return {"success": True, "scores": scores}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/thresholds")
async def get_thresholds():
    """Get scoring thresholds"""
    return {
        "hire_threshold": scorer_service.HIRE_THRESHOLD,
        "review_threshold": scorer_service.REVIEW_THRESHOLD,
        "weights": scorer_service.WEIGHTS
    }
