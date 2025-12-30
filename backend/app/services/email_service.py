import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings


def send_resume_report(email: str, analysis: dict, job_role: str | None):
    """
    Sends resume analysis email.
    This function MUST NEVER crash the API.
    """

    try:
        if not settings.SMTP_HOST or not settings.SMTP_EMAIL:
            print("⚠️ SMTP settings not configured. Skipping backend email.")
            return

        msg = MIMEMultipart("alternative")
        msg["From"] = settings.SMTP_EMAIL
        msg["To"] = email
        msg["Subject"] = f"Your Resume ATS Report – {analysis['ats_score']}/100"

        role_text = job_role if job_role else "General Evaluation"

        html_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Resume Analysis Report</h2>
            <p><b>Target Role:</b> {role_text}</p>
            <p><b>ATS Score:</b> {analysis['ats_score']} / 100</p>

            <h3>Overall Summary</h3>
            <p>{analysis['overall_summary']}</p>

            <h3>Strengths</h3>
            <ul>
                {''.join(f"<li>{s}</li>" for s in analysis.get("strengths", []))}
            </ul>

            <h3>Improvement Suggestions</h3>
            <ul>
                {''.join(f"<li>{s}</li>" for s in analysis.get("improvement_suggestions", []))}
            </ul>

            <p style="margin-top:20px;">
                — ResumyZer
            </p>
        </body>
        </html>
        """

        msg.attach(MIMEText(html_content, "html"))

        # ✅ USE SSL (Render allows this)
        with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
            server.send_message(msg)

        print("📩 Email sent successfully")

    except Exception as e:
        # 🚨 NEVER crash API
        print("⚠️ Email failed but API continues")
        print(str(e))
