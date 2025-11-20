from pydantic import BaseModel
from typing import Optional

# -----------------------------------------------------------
# Base schema shared by create & update (NO user_id here!)
# -----------------------------------------------------------
class CaseBase(BaseModel):
    title: str
    description: str
    predicted_category: Optional[str] = None
    court_type: Optional[str] = None
    lawyer_type: Optional[str] = None


# -----------------------------------------------------------
# Create schema - all required except optional fields
# user_id removed (backend supplies it from JWT)
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
# Output schema - includes ID + user_id
# user_id IS allowed in output but NOT in input
# -----------------------------------------------------------
class CaseOut(CaseBase):
    id: int
    user_id: str   # only visible in responses

    model_config = {
        "from_attributes": True
    }