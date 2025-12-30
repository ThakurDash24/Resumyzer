def build_resume_prompt(resume_text: str, job_role: str | None) -> str:
    role = job_role if job_role else "General ATS Evaluation"

    return f"""
You are an expert ATS resume evaluator.

Analyze the resume below for the role of: {role}

Return a detailed ATS evaluation with:
- ats_score (0–100)
- overall_summary
- strengths
- missing_or_weak_areas
- ats_keyword_gaps
- improvement_suggestions
- structure_feedback
- final_recommendation

Resume:
{resume_text}

IMPORTANT OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT include markdown
- Do NOT include explanations
- Do NOT include code fences
- Do NOT include text outside JSON
- If analysis cannot be performed, return EXACTLY this JSON:

{{
  "ats_score": 0,
  "overall_summary": "Analysis unavailable",
  "strengths": [],
  "missing_or_weak_areas": [],
  "ats_keyword_gaps": [],
  "improvement_suggestions": [],
  "structure_feedback": [],
  "final_recommendation": "Please retry later"
}}
"""
