from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.case import Case
from app.routers import cases
from app.auth import get_current_user

app = FastAPI(title="JustiFy API")

API_PREFIX = "/api/v1"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register router ONLY ONCE
app.include_router(cases.router, prefix=API_PREFIX)

@app.get("/")
def root():
    return {"message": "Welcome to the JustiFy API"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "justify-api"}

@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    count = db.query(Case).count()
    return {"status": "ok", "cases_count": count}

@app.get("/api/v1/auth/me")
def auth_me(user=Depends(get_current_user)):
    return {"user": user}