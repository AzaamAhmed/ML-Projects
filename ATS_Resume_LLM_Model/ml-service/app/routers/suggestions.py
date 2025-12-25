"""
Suggestions Router - API endpoints for resume improvement suggestions
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from app.services.suggestions import suggestions_service
from app.services.resume_parser import resume_parser
from app.services.matcher import matcher_service
from app.models.schemas import Suggestion, JobDescription

router = APIRouter()


class SuggestionsRequest(BaseModel):
    resume_text: str
    job_description: Optional[str] = None


class SuggestionsResponse(BaseModel):
    success: bool
    suggestions: List[Suggestion]
    improvement_priority: str


class RewriteRequest(BaseModel):
    resume_text: str
    job_description: str
    style: str = "professional"


@router.post("/generate", response_model=SuggestionsResponse)
async def generate_suggestions(request: SuggestionsRequest):
    """Generate resume improvement suggestions"""
    try:
        parsed = resume_parser.parse_resume(request.resume_text)
        
        jd = None
        keyword_gaps = None
        match_result = None
        
        if request.job_description:
            jd = JobDescription(
                job_id="TEMP",
                title="Target",
                description=request.job_description,
                required_skills=[],
                min_experience_years=0
            )
            keyword_gaps = matcher_service.analyze_keyword_gaps(
                request.resume_text, request.job_description
            )
            match_result = matcher_service.match_resume_to_job(parsed, jd)
        
        suggestions = suggestions_service.generate_suggestions(
            parsed, jd, keyword_gaps, match_result
        )
        
        # Determine priority
        high_priority = len([s for s in suggestions if s.priority == "high"])
        priority = "high" if high_priority >= 2 else ("medium" if high_priority >= 1 else "low")
        
        return SuggestionsResponse(
            success=True,
            suggestions=suggestions,
            improvement_priority=priority
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/rewrite")
async def rewrite_resume(request: RewriteRequest):
    """Generate rewritten resume sections"""
    try:
        result = suggestions_service.generate_rewrite_suggestions(
            request.resume_text,
            request.job_description
        )
        return {"success": True, **result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/templates")
async def get_ats_templates():
    """Get ATS-safe resume templates"""
    return {
        "templates": [
            {
                "id": "professional",
                "name": "Professional",
                "description": "Clean, traditional format ideal for corporate roles",
                "sections": ["Summary", "Experience", "Skills", "Education"]
            },
            {
                "id": "technical",
                "name": "Technical",
                "description": "Skills-focused format for tech roles",
                "sections": ["Skills", "Experience", "Projects", "Education"]
            },
            {
                "id": "modern",
                "name": "Modern",
                "description": "Contemporary design with visual elements",
                "sections": ["Profile", "Skills", "Experience", "Education"]
            }
        ]
    }
