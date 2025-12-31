import json
import google.generativeai as genai

from app.core.config import settings
from app.core.prompt import build_resume_prompt

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

# Use Gemini 2.5 Flash
model = genai.GenerativeModel("models/gemini-2.5-flash")


def analyze_resume_with_gemini(resume_text: str, job_role: str | None) -> dict:
    """
    Analyze resume text using Gemini.
    This function NEVER raises to the API layer.
    It always returns valid JSON (real or fallback).
    """

    prompt = build_resume_prompt(resume_text, job_role)
    last_error = None

    for attempt in range(2):
        try:
            response = model.generate_content(prompt)

            raw_text = response.text

            # FIX 2: Guard empty / whitespace response
            if not raw_text or not raw_text.strip():
                raise ValueError("Empty response from Gemini")

            # FIX 1: Safely extract JSON only
            start = raw_text.find("{")
            end = raw_text.rfind("}")

            if start == -1 or end == -1:
                raise ValueError(f"No JSON found in Gemini response: {raw_text}")

            json_text = raw_text[start:end + 1]
            data = json.loads(json_text)

            # Defensive normalization
            score = int(data.get("ats_score", 0))
            data["ats_score"] = max(0, min(score, 100))

            data.setdefault("overall_summary", "")
            data.setdefault("strengths", [])
            data.setdefault("missing_or_weak_areas", [])
            data.setdefault("ats_keyword_gaps", [])
            data.setdefault("improvement_suggestions", [])
            data.setdefault("structure_feedback", [])
            data.setdefault("final_recommendation", "")

            return data

        except Exception as e:
            print(f"[Gemini Attempt {attempt + 1} Failed]: {e}")
            last_error = e

    # 🔒 FIX 3: Graceful fallback (NO CRASH)
    print("[Gemini Fallback Activated]", last_error)

    return {
        "ats_score": 0,
        "overall_summary": "AI analysis could not be completed due to a temporary system issue.",
        "strengths": [],
        "missing_or_weak_areas": [],
        "ats_keyword_gaps": [],
        "improvement_suggestions": ["Please retry analysis later."],
        "structure_feedback": [],
        "final_recommendation": "Analysis incomplete due to AI service unavailability.",
        "is_fallback": True
    }
