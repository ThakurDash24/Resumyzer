from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Gemini
    GEMINI_API_KEY: str

    # Supabase (backend-only)
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # EmailJS (optional for now)
    EMAILJS_PUBLIC_KEY: str | None = None
    EMAILJS_SERVICE_ID: str | None = None
    EMAILJS_TEMPLATE_ID: str | None = None

    class Config:
        env_file = ".env"
        extra = "forbid"  # keep strict
    
    # SMTP (Gmail)
    # SMTP (Gmail) - Optional if frontend handles email
    SMTP_EMAIL: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_HOST: str | None = None
    SMTP_PORT: int | None = None


settings = Settings()
