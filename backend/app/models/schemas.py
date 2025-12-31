from pydantic import BaseModel

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    overall_summary: str
    strengths: list[str] = []
    missing_or_weak_areas: list[str] = []
    ats_keyword_gaps: list[str] = []
    improvement_suggestions: list[str] = []
    structure_feedback: list[str] = []
    final_recommendation: str
    email_status: str
    extracted_email: str | None = None
    is_fallback: bool = False
