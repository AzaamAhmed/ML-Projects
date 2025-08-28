import io
import logging
from typing import Optional
from pydantic import BaseModel
import edge_tts  # Microsoft Edge TTS service
import asyncio

logger = logging.getLogger(__name__)

class TextToSpeech:
    def __init__(self):
        self.default_voice = "en-US-AriaNeural"
        self.emotion_voice_mapping = {
            "happy": "en-US-JennyNeural",
            "neutral": "en-US-AriaNeural",
            "encouraging": "en-US-JennyNeural",
            "thinking": "en-US-GuyNeural",
            "explaining": "en-US-DavisNeural",
            "confused": "en-US-JaneNeural"
        }
    
    async def synthesize(
        self,
        text: str,
        voice_id: Optional[str] = None,
        emotion: str = "neutral"
    ) -> bytes:
        """
        Convert text to speech using Microsoft Edge TTS
        """
        try:
            # Select voice based on emotion or use provided voice_id
            voice = voice_id or self.emotion_voice_mapping.get(emotion, self.default_voice)
            
            # Create communicate instance
            communicate = edge_tts.Communicate(text, voice)
            
            # Generate speech
            audio_data = io.BytesIO()
            async for chunk in communicate.stream():
                if chunk["type"] == "audio" and "data" in chunk:
                    audio_data.write(chunk["data"])
                    
            return audio_data.getvalue()
            
        except Exception as e:
            logger.error(f"Text-to-speech error: {e}")
            raise RuntimeError(f"Speech synthesis failed: {str(e)}")
    
    def get_available_voices(self):
        """Get list of available voices"""
        return list(self.emotion_voice_mapping.values())
