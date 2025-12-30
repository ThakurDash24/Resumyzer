from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import re

from app.services.pdf_service import extract_text_from_pdf
from app.services.gemini_service import analyze_resume_with_gemini
from app.services.email_service import send_resume_report
from app.services.supabase_service import store_resume_analysis

from app.utils.helpers import generate_resume_hash
from app.models.schemas import ResumeAnalysisResponse

router = APIRouter()


@router.post("/analyze-resume", response_model=ResumeAnalysisResponse)
async def analyze_resume(
    resume: UploadFile = File(...),
    email: str | None = Form(None),
    job_role: str | None = Form(None),
):
    # 1️⃣ Validate file
    if resume.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    # 2️⃣ Extract resume text
    resume_text = extract_text_from_pdf(resume)
    MAX_CHARS = 8000
    resume_text = resume_text[:MAX_CHARS]

    if not resume_text or len(resume_text.strip()) < 200:
        raise HTTPException(
            status_code=400,
            detail="Resume content too short for analysis"
        )

    # 2.5️⃣ Extract email if missing
    final_email = email
    if not final_email:
        # Simple regex for email extraction
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', resume_text)
        if email_match:
            final_email = email_match.group(0)
        else:
            final_email = "unknown@example.com"

    # 3️⃣ AI Analysis (Gemini)
    analysis_result = analyze_resume_with_gemini(
        resume_text=resume_text,
        job_role=job_role
    )

    # 4️⃣ Generate resume hash (for dedup / analytics)
    resume_hash = generate_resume_hash(resume_text)

    # 5️⃣ Store analysis in Supabase
    store_resume_analysis(
        email=final_email,
        job_role=job_role,
        analysis=analysis_result,
        resume_hash=resume_hash
    )

    # 6️⃣ Send detailed email report
    # Backend email sending is DISABLED. Frontend handles this via EmailJS.

    # 7️⃣ Respond to frontend (minimal, clean)
    return {
        "ats_score": analysis_result["ats_score"],
        "summary": analysis_result["overall_summary"],
        "email_status": "handled_by_frontend",
        "extracted_email": final_email
    }
