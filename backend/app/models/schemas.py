from pydantic import BaseModel
from typing import Optional


# -----------------------------------------------------------
# Base schema shared by create & update
# -----------------------------------------------------------
class CaseBase(BaseModel):
    user_id: str
    title: str
    description: str
    predicted_category: Optional[str] = None
    court_type: Optional[str] = None
    lawyer_type: Optional[str] = None


# -----------------------------------------------------------
# Create schema - all required except optional fields
# -----------------------------------------------------------
class CaseCreate(CaseBase):
    pass


# -----------------------------------------------------------
# Update schema - partial updates allowed
# -----------------------------------------------------------
class CaseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    predicted_category: Optional[str] = None
    court_type: Optional[str] = None
    lawyer_type: Optional[str] = None


# -----------------------------------------------------------
# Output schema - includes ID
# -----------------------------------------------------------
class CaseOut(CaseBase):
    id: int

    # Required in Pydantic v2 instead of orm_mode=True
    model_config = {
        "from_attributes": True
    }