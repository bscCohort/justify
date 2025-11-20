from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import declarative_base
from app.db import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=False)  # later from Supabase Auth
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    
    predicted_category = Column(String, nullable=True)
    court_type = Column(String, nullable=True)
    lawyer_type = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())