"""
ATS Resume Checker - ML Microservice
FastAPI application for resume parsing, JD matching, and ATS scoring
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume, matching, scoring, suggestions

# Initialize FastAPI application
app = FastAPI(
    title="ATS Resume Checker ML Service",
    description="AI-powered resume analysis and matching microservice",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
app.include_router(matching.router, prefix="/api/matching", tags=["Matching"])
app.include_router(scoring.router, prefix="/api/scoring", tags=["Scoring"])
app.include_router(suggestions.router, prefix="/api/suggestions", tags=["Suggestions"])


@app.get("/", tags=["Health"])
async def root():
    """Root endpoint - Health check"""
    return {
        "status": "healthy",
        "service": "ATS Resume Checker ML Service",
        "version": "1.0.0"
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Detailed health check endpoint"""
    return {
        "status": "healthy",
        "services": {
            "resume_parser": "operational",
            "jd_matcher": "operational",
            "ats_scorer": "operational",
            "suggestion_engine": "operational"
        }
    }
