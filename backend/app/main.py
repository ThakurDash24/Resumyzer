from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as resume_router

app = FastAPI(
    title="ResumyZer API",
    version="1.0.0",
    description="AI-powered Resume ATS Analyzer"
)

# CORS (adjust origins later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://resumyzer-24.vercel.app",
    "https://resumyzer-24-git-main-thakur-dashs-projects.vercel.app"
]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "ResumyZer backend running"}

app.include_router(resume_router, prefix="/api")

@app.get("/health")
def health_check():
    return {"status": "ok"}
