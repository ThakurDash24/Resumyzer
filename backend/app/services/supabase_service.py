from supabase import create_client, Client
from app.core.config import settings

# Create Supabase client ONCE at module load
supabase: Client = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)

def store_resume_analysis(
    email: str,
    job_role: str | None,
    analysis: dict,
    resume_hash: str | None
):
    print(">>> Supabase store_resume_analysis CALLED")

    data = {
        "email": email,
        "job_role": job_role,
        "ats_score": analysis["ats_score"],
        "overall_summary": analysis["overall_summary"],
        "strengths": analysis["strengths"],
        "missing_or_weak_areas": analysis["missing_or_weak_areas"],
        "ats_keyword_gaps": analysis["ats_keyword_gaps"],
        "improvement_suggestions": analysis["improvement_suggestions"],
        "structure_feedback": analysis["structure_feedback"],
        "final_recommendation": analysis["final_recommendation"],
        "resume_hash": resume_hash
    }

    response = supabase.table("resume_analyses").insert(data).execute()

    print(">>> Supabase insert response:", response)
