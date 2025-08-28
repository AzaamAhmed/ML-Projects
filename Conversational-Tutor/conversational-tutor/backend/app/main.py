from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.core.config import settings
# from app.core.logging import configure_logging
from app.api.routes_chat import router as chat_router
from app.api.routes_audio import router as audio_router

# Configure logging
# configure_logging()

app = FastAPI(
    title="Conversational AI Tutor API",
    description="RAG-powered AI tutor with speech capabilities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix=f"{settings.api_prefix}/chat", tags=["chat"])
app.include_router(audio_router, prefix=f"{settings.api_prefix}/audio", tags=["audio"])

@app.get("/")
async def root():
    return {"message": "Conversational AI Tutor API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )