from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

app = FastAPI(
    title="ResumyZer API",
    version="1.0.0"
)

# ✅ CORS — CLEAN & SAFE
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://resumyzer-ui.vercel.app",
        "https://resumyzer-24.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "ResumyZer backend running"}
