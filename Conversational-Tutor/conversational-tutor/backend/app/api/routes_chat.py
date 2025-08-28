from fastapi import APIRouter, Depends, HTTPException
import logging
from pydantic import BaseModel
from enum import Enum

# Using local schema definitions
from app.rag.chain import TutorChain
from app.rag.vectorstore import VectorStoreManager



router = APIRouter()
vectorstore_manager = VectorStoreManager()
logger = logging.getLogger(__name__)

def get_tutor_chain() -> TutorChain:
    """Dependency to get the tutor chain instance."""
    vectorstore = vectorstore_manager.get_store()
    if vectorstore is None:
        raise HTTPException(status_code=500, detail="Vectorstore not initialized")
    retriever = vectorstore.as_retriever()
    return TutorChain(retriever=retriever)

class Emotion(str, Enum):
    NEUTRAL = "neutral"
    HAPPY = "happy"
    SAD = "sad"
    ANGRY = "angry"

class QueryRequest(BaseModel):
    question: str

class QueryResponse(BaseModel):
    text: str
    emotion: Emotion

class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None

class ChatResponse(BaseModel):
    response: str
    emotion: Emotion
    conversation_id: str

@router.post("/query", response_model=QueryResponse)
async def query_endpoint(
    request: QueryRequest,
    tutor_chain: TutorChain = Depends(get_tutor_chain)
) -> QueryResponse:
    """Single query endpoint"""
    try:
        response_text, emotion = await tutor_chain.ainvoke(request.question)
        
        return QueryResponse(
            text=response_text,
            emotion=Emotion(emotion)
        )
    except Exception as e:
        logger.error(f"Query error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(
    request: ChatRequest,
    tutor_chain: TutorChain = Depends(get_tutor_chain)
) -> ChatResponse:
    """Multi-turn conversation endpoint"""
    try:
        response_text, emotion = await tutor_chain.ainvoke(request.message)
        
        return ChatResponse(
            response=response_text,
            emotion=Emotion(emotion),
            conversation_id=request.conversation_id or "new_conversation"
        )
    except Exception as e:
        logger.error(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


