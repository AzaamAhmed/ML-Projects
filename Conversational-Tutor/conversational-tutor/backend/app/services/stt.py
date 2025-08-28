import io
import logging
from typing import Optional, Any, Dict, Union
import speech_recognition as sr
from pydantic import BaseModel

logger = logging.getLogger(__name__)

class TranscriptionResult(BaseModel):
    text: str
    confidence: Optional[float] = None

class SpeechToText:
    def __init__(self):
        self.recognizer = sr.Recognizer()
        
    async def transcribe(self, audio_bytes: io.BytesIO, language: str = "en") -> str:
        """
        Transcribe speech from audio bytes to text
        """
        try:
            # Convert audio bytes to AudioFile
            with sr.AudioFile(audio_bytes) as source:
                # Record audio
                audio = self.recognizer.record(source)
                
                # Perform speech recognition
                result = self.recognizer.recognize_google(  # type: ignore
                    audio,
                    language=language,
                    show_all=True
                )
                
                if not result:
                    raise ValueError("No speech detected")
                
                # Get the most confident transcript
                if isinstance(result, list):
                    best_result = max(result, key=lambda x: x.get('confidence', 0))
                    text = best_result['transcript']
                else:
                    text = result
                    
                return text
                
        except sr.UnknownValueError:
            logger.warning("Speech recognition could not understand the audio")
            raise ValueError("Speech could not be understood")
            
        except sr.RequestError as e:
            logger.error(f"Speech recognition service error: {e}")
            raise RuntimeError("Speech recognition service failed")
            
        except Exception as e:
            logger.error(f"Transcription error: {e}")
            raise RuntimeError(f"Transcription failed: {str(e)}")

class Recognizer:
    def record(self, source: Any) -> Any: ...
    def recognize_google(
        self,
        audio_data: Any,
        key: Optional[str] = None,
        language: str = "en-US",
        show_all: bool = False
    ) -> Union[str, Dict[str, Any]]: ...

class AudioFile:
    def __init__(self, filename_or_fileobject: Any) -> None: ...
    def __enter__(self) -> 'AudioFile': ...
    def __exit__(self, exc_type: Any, exc_value: Any, traceback: Any) -> None: ...
