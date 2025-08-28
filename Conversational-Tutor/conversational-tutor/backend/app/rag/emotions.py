from typing import Literal
import re

EmotionType = Literal["happy", "thinking", "explaining", "encouraging", "confused", "neutral"]

class EmotionClassifier:
    def classify_emotion(self, text: str) -> EmotionType:
        """Classify emotion based on text content"""
        text_lower = text.lower()
        
        # Patterns for different emotions
        encouraging_patterns = [
            r"great job", r"well done", r"excellent", r"fantastic", 
            r"you can do it", r"keep trying", r"proud of you"
        ]
        
        thinking_patterns = [
            r"let me think", r"that's a good question", r"interesting question",
            r"let's see", r"consider this"
        ]
        
        explaining_patterns = [
            r"explain", r"means that", r"in other words", r"for example",
            r"basically", r"to understand this"
        ]
        
        confused_patterns = [
            r"i don't understand", r"not sure", r"could you clarify",
            r"please rephrase", r"i'm confused"
        ]
        
        happy_patterns = [
            r"wonderful", r"awesome", r"amazing", r"perfect",
            r"!\s*$", r"\?\\s*$"  # Exclamation or question mark at end
        ]
        
        # Check patterns in order of priority
        for pattern in encouraging_patterns:
            if re.search(pattern, text_lower):
                return "encouraging"
                
        for pattern in thinking_patterns:
            if re.search(pattern, text_lower):
                return "thinking"
                
        for pattern in explaining_patterns:
            if re.search(pattern, text_lower):
                return "explaining"
                
        for pattern in confused_patterns:
            if re.search(pattern, text_lower):
                return "confused"
                
        for pattern in happy_patterns:
            if re.search(pattern, text_lower):
                return "happy"
        
        return "neutral"