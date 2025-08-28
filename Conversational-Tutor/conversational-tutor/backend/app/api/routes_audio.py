from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
import logging
from pydantic import BaseModel
from typing import Optional
import io

from app.services.stt import SpeechToText
from app.services.tts import TextToSpeech
from app.utils.audio import AudioProcessor

router = APIRouter()
logger = logging.getLogger(__name__)

# Initialize services
stt_service = SpeechToText()
tts_service = TextToSpeech()
audio_processor = AudioProcessor()

class TTSRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None
    emotion: Optional[str] = "neutral"

@router.post("/speech-to-text")
async def speech_to_text(
    audio_file: UploadFile = File(...),
    language: str = "en"
):
    """Convert speech audio to text"""
    try:
        # Read and process audio file
        audio_content = await audio_file.read()
        audio_bytes = io.BytesIO(audio_content)
        
        # Convert to text
        text = await stt_service.transcribe(audio_bytes, language)
        
        return {"text": text}
    except Exception as e:
        logger.error(f"Speech-to-text error: {e}")
        raise HTTPException(status_code=500, detail="Speech recognition failed")

@router.post("/text-to-speech")
async def text_to_speech(request: TTSRequest):
    """Convert text to speech"""
    try:
        # Generate speech
        audio_data = await tts_service.synthesize(
            text=request.text,
            voice_id=request.voice_id,
            emotion=request.emotion or "neutral"
        )
        
        # Return audio stream
        return StreamingResponse(
            io.BytesIO(audio_data),
            media_type="audio/wav",
            headers={
                "Content-Disposition": "attachment; filename=speech.wav"
            }
        )
    except Exception as e:
        logger.error(f"Text-to-speech error: {e}")
        raise HTTPException(status_code=500, detail="Speech synthesis failed")

@router.post("/process-audio")
async def process_audio(
    audio_file: UploadFile = File(...),
    normalize: bool = True,
    remove_noise: bool = True
):
    """Process audio file with various improvements"""
    try:
        # Read audio file
        audio_content = await audio_file.read()
        audio_bytes = io.BytesIO(audio_content)
        
        # Process audio
        processed_audio = await audio_processor.process(
            audio_bytes,
            normalize=normalize,
            remove_noise=remove_noise
        )
        
        # Return processed audio
        return StreamingResponse(
            io.BytesIO(processed_audio),
            media_type="audio/wav",
            headers={
                "Content-Disposition": "attachment; filename=processed_audio.wav"
            }
        )
    except Exception as e:
        logger.error(f"Audio processing error: {e}")
        raise HTTPException(status_code=500, detail="Audio processing failed")
