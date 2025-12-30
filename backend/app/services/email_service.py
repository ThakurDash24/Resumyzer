import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.core.config import settings
from app.services.email_template_renderer import render_resume_report_html


def send_resume_report(email: str, analysis: dict, job_role: str | None):
    html_body = render_resume_report_html(
    email=email,
    analysis=analysis,
    job_role=job_role
)

    msg = MIMEMultipart("alternative")
    msg["From"] = settings.SMTP_EMAIL
    msg["To"] = email
    msg["Subject"] = f"Your Resume ATS Report – {analysis['ats_score']}/100"

    msg.attach(MIMEText(html_body, "html"))

    server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT)
    server.starttls()
    server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
    server.sendmail(settings.SMTP_EMAIL, email, msg.as_string())
    server.quit()
