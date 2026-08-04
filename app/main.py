from fastapi import FastAPI
from core.config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "app": settings.app_name,
        "env": settings.app_env,
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": settings.app_name,
    }