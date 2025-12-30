from pydantic import BaseModel

class ResumeAnalysisResponse(BaseModel):
    ats_score: int
    summary: str
    email_status: str
