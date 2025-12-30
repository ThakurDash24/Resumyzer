from pydantic import BaseModel

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    summary: str
    strengths: list[str] = []
    missing_or_weak_areas: list[str] = []
    improvement_suggestions: list[str] = []
    email_status: str
    extracted_email: str | None = None
