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
    SMTP_EMAIL: str
    SMTP_PASSWORD: str
    SMTP_HOST: str
    SMTP_PORT: int


settings = Settings()
