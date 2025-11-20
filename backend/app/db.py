import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# -------------------------------------------------
# Load environment variables from .env
# -------------------------------------------------
load_dotenv()

USER = os.getenv("SUPABASE_INSTANCE_USER")
PASSWORD = os.getenv("SUPABASE_INSTANCE_PASSWORD")
HOST = os.getenv("SUPABASE_INSTANCE_HOST")
PORT = os.getenv("SUPABASE_INSTANCE_PORT")
DBNAME = os.getenv("SUPABASE_INSTANCE_DATABASE")
POOLMODE = os.getenv("SUPABASE_INSTANCE_POOL_MODE")

# -------------------------------------------------
# Build SQLAlchemy URL step-by-step for teaching
# -------------------------------------------------
# Final format for SQLAlchemy with psycopg2:
# postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DBNAME
DATABASE_URL = (
    "postgresql+psycopg2://"
    f"{USER}:{PASSWORD}@"
    f"{HOST}:{PORT}/"
    f"{DBNAME}"
)

if None in [USER, PASSWORD, HOST]:
    raise RuntimeError("❌ Missing one or more DB environment variables.")


# -------------------------------------------------
# SQLAlchemy Engine + Session
# -------------------------------------------------
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


# -------------------------------------------------
# Dependency for FastAPI
# -------------------------------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()