from sqlalchemy import Column, String, Text, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.db import Base


class Case(Base):
    __tablename__ = "cases"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, nullable=False)
    user_id = Column(UUID(as_uuid=True), nullable=True)
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    predicted_category = Column(Text, nullable=True)
    court_type = Column(Text, nullable=True)
    lawyer_type = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default="new")
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now(), nullable=False)