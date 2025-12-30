from pathlib import Path

TEMPLATE_PATH = Path("app/templates/resume_report.html")


def render_resume_report_html(
    email: str,
    analysis: dict,
    job_role: str | None
) -> str:
    html = TEMPLATE_PATH.read_text(encoding="utf-8")

    user_name = email.split("@")[0]
    role = job_role if job_role else "General ATS Evaluation"

    # Build report HTML
    report_html = f"""
    <h3>Target Role</h3>
    <p>{role}</p>

    <h3>ATS Score</h3>
    <p><strong>{analysis['ats_score']} / 100</strong></p>

    <h3>Overall Summary</h3>
    <p>{analysis['overall_summary']}</p>

    <h3>Strengths</h3>
    <ul>
        {''.join(f'<li>{s}</li>' for s in analysis['strengths'])}
    </ul>

    <h3>Missing / Weak Areas</h3>
    <ul>
        {''.join(f'<li>{m}</li>' for m in analysis['missing_or_weak_areas'])}
    </ul>

    <h3>ATS Keyword Gaps</h3>
    <ul>
        {''.join(f'<li>{k}</li>' for k in analysis['ats_keyword_gaps'])}
    </ul>

    <h3>Improvement Suggestions</h3>
    <ul>
        {''.join(f'<li>{i}</li>' for i in analysis['improvement_suggestions'])}
    </ul>

    <h3>Final Recommendation</h3>
    <p>{analysis['final_recommendation']}</p>
    """

    # Replace placeholders
    html = html.replace("{{user_name}}", user_name)
    html = html.replace("{{report}}", report_html)

    return html
