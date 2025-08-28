from pydantic_settings import BaseSettings
from pydantic import Field, RedisDsn
from typing import Optional
import os

class Settings(BaseSettings):
    # API Settings
    api_prefix: str = "/api/v1"
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    
    # Vector Database
    vectorstore_url: RedisDsn = Field("redis://localhost:6379")
    vectorstore_index: str = "tutor_documents"
    
    # LLM Settings
    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    llm_provider: str = "openai"  # openai or anthropic
    llm_model: str = "gpt-4-turbo"
    
    # Embeddings
    embeddings_model: str = "text-embedding-3-small"
    
    # STT/TTS Settings
    whisper_model: str = "base"
    elevenlabs_api_key: Optional[str] = None
    tts_provider: str = "elevenlabs"  # elevenlabs, google, or pyttsx3
    
    # CORS
    cors_origins: list = ["http://localhost:3000"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()