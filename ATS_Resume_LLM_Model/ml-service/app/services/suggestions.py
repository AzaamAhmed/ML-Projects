"""
Suggestions Service
Generates resume improvement suggestions based on analysis
"""

from typing import List
from app.models.schemas import (
    ParsedResume, JobDescription, Suggestion, KeywordGap, MatchResult
)


class SuggestionsService:
    """Service for generating resume improvement suggestions"""
    
    def generate_suggestions(
        self,
        parsed_resume: ParsedResume,
        job_description: JobDescription = None,
        keyword_gaps: KeywordGap = None,
        match_result: MatchResult = None
    ) -> List[Suggestion]:
        """Generate improvement suggestions"""
        suggestions = []
        
        # Skills suggestions
        if match_result and match_result.missing_skills:
            suggestions.append(Suggestion(
                category="skills",
                priority="high",
                title="Add Missing Required Skills",
                description=f"Add these skills mentioned in the job description",
                action_items=[f"Add '{skill}' to your skills section" 
                             for skill in match_result.missing_skills[:5]]
            ))
        
        # Keyword suggestions
        if keyword_gaps and keyword_gaps.missing_keywords:
            suggestions.append(Suggestion(
                category="keywords",
                priority="high",
                title="Include Missing Keywords",
                description="Add these keywords to improve ATS compatibility",
                action_items=[f"Include '{kw}' in relevant sections" 
                             for kw in keyword_gaps.missing_keywords[:5]]
            ))
        
        # Experience suggestions
        if len(parsed_resume.experience) < 2:
            suggestions.append(Suggestion(
                category="experience",
                priority="medium",
                title="Expand Work Experience",
                description="Add more details about your work experience",
                action_items=[
                    "Include quantifiable achievements",
                    "Add action verbs to descriptions",
                    "Mention technologies used in each role"
                ]
            ))
        
        # Summary suggestions
        if not parsed_resume.summary:
            suggestions.append(Suggestion(
                category="format",
                priority="medium",
                title="Add Professional Summary",
                description="A strong summary helps ATS and recruiters",
                action_items=[
                    "Write a 2-3 sentence professional summary",
                    "Include your key skills and experience level",
                    "Mention your career objective"
                ]
            ))
        
        # Certifications suggestions
        if not parsed_resume.certifications:
            suggestions.append(Suggestion(
                category="skills",
                priority="low",
                title="Add Certifications",
                description="Relevant certifications boost credibility",
                action_items=[
                    "Add any industry certifications",
                    "Include online course certificates",
                    "Mention professional memberships"
                ]
            ))
        
        return suggestions
    
    def generate_rewrite_suggestions(
        self,
        resume_text: str,
        job_description: str
    ) -> dict:
        """Generate rewritten resume sections"""
        return {
            "improved_summary": f"Experienced professional with proven track record...",
            "improved_skills": "Organized skills by relevance to the position",
            "keyword_additions": ["Added relevant industry keywords"],
            "format_suggestions": [
                "Use bullet points for achievements",
                "Keep resume to 1-2 pages",
                "Use consistent date formatting"
            ],
            "ats_score_improvement": 15.0
        }


suggestions_service = SuggestionsService()
