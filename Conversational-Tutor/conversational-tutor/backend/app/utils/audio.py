import io
import numpy as np
from typing import Optional
import soundfile as sf
from scipy import signal
import noisereduce as nr
import logging

logger = logging.getLogger(__name__)

class AudioProcessor:
    def __init__(self):
        self.sample_rate = 16000  # Default sample rate
        
    async def process(
        self,
        audio_bytes: io.BytesIO,
        normalize: bool = True,
        remove_noise: bool = True
    ) -> bytes:
        """
        Process audio with various improvements
        """
        try:
            # Read audio data
            audio_data, sample_rate = sf.read(audio_bytes)
            
            # Convert to mono if stereo
            if len(audio_data.shape) > 1:
                audio_data = np.mean(audio_data, axis=1)
            
            # Remove noise if requested
            if remove_noise:
                audio_data = nr.reduce_noise(
                    y=audio_data,
                    sr=sample_rate
                )
            
            # Normalize audio if requested
            if normalize:
                audio_data = self._normalize_audio(audio_data)
            
            # Convert back to bytes
            output = io.BytesIO()
            sf.write(output, audio_data, sample_rate, format='WAV')
            return output.getvalue()
            
        except Exception as e:
            logger.error(f"Audio processing error: {e}")
            raise RuntimeError(f"Audio processing failed: {str(e)}")
    
    def _normalize_audio(self, audio_data: np.ndarray) -> np.ndarray:
        """
        Normalize audio to have max amplitude of 1
        """
        return audio_data / np.max(np.abs(audio_data))
