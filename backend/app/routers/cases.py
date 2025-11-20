from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder

from app.db import get_db
from app.auth import verify_api_key
from app.models.case import Case
from app.models.schemas import CaseCreate, CaseUpdate, CaseOut


# -----------------------------------------------------------
# Helper response wrappers
# -----------------------------------------------------------
def success(data=None, message="ok"):
    return {
        "success": True,
        "message": message,
        "data": jsonable_encoder(data)
    }


def error(message="error", status_code=400):
    raise HTTPException(status_code=status_code, detail=message)


# -----------------------------------------------------------
# Router
# -----------------------------------------------------------
router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
    dependencies=[Depends(verify_api_key)]
)


# -----------------------------------------------------------
# Create Case
# -----------------------------------------------------------
@router.post("/", response_model=dict)
def create_case(data: CaseCreate, db: Session = Depends(get_db)):
    new = Case(**data.model_dump())
    db.add(new)
    db.commit()
    db.refresh(new)
    return success(new, "Case created")


# -----------------------------------------------------------
# List Cases
# -----------------------------------------------------------
@router.get("/", response_model=dict)
def list_cases(db: Session = Depends(get_db)):
    items = db.query(Case).all()
    return success(items)


# -----------------------------------------------------------
# Get Case by ID
# -----------------------------------------------------------
@router.get("/{case_id}", response_model=dict)
def get_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        return error("Case not found", 404)
    return success(case)


# -----------------------------------------------------------
# Update Case
# -----------------------------------------------------------
@router.put("/{case_id}", response_model=dict)
def update_case(case_id: int, data: CaseUpdate, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        return error("Case not found", 404)

    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(case, key, value)

    db.commit()
    db.refresh(case)
    return success(case, "Case updated")


# -----------------------------------------------------------
# Delete Case
# -----------------------------------------------------------
@router.delete("/{case_id}", response_model=dict)
def delete_case(case_id: int, db: Session = Depends(get_db)):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        return error("Case not found", 404)

    db.delete(case)
    db.commit()
    return success(message="Case deleted")