from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.case import Case
from app.routers import example  # existing import

app = FastAPI(title="JustiFy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # we'll tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(example.router)


@app.get("/")
def root():
    return {"message": "Welcome to the JustiFy API"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "justify-api"}


@app.get("/db-check")
def db_check(db: Session = Depends(get_db)):
    # Try a simple query: count rows in cases
    count = db.query(Case).count()
    return {"status": "ok", "cases_count": count}