from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db import get_db
from app.auth import get_current_user
from app.models.case import Case
from app.models.schemas import CaseCreate, CaseUpdate, CaseOut

router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)

# -----------------------------------------
# CREATE CASE
# -----------------------------------------
@router.post("/", response_model=CaseOut)
def create_case(
    data: CaseCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = user["user_id"]

    new = Case(
        user_id=user_id,
        title=data.title,
        description=data.description
    )

    db.add(new)
    db.commit()
    db.refresh(new)
    return new


# -----------------------------------------
# LIST CASES
# -----------------------------------------
@router.get("/", response_model=list[CaseOut])
def list_cases(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = user["user_id"]
    return db.query(Case).filter(Case.user_id == user_id).all()


# -----------------------------------------
# GET SINGLE CASE
# -----------------------------------------
@router.get("/{case_id}", response_model=CaseOut)
def get_case(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = user["user_id"]
    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == user_id
    ).first()

    if not case:
        raise HTTPException(404, "Case not found")

    return case


# -----------------------------------------
# UPDATE CASE
# -----------------------------------------
@router.put("/{case_id}", response_model=CaseOut)
def update_case(
    case_id: int,
    data: CaseUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = user["user_id"]

    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == user_id
    ).first()

    if not case:
        raise HTTPException(404, "Case not found")

    for key, value in data.dict(exclude_unset=True).items():
        setattr(case, key, value)

    db.commit()
    db.refresh(case)
    return case


# -----------------------------------------
# DELETE CASE
# -----------------------------------------
@router.delete("/{case_id}")
def delete_case(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    user_id = user["user_id"]

    case = db.query(Case).filter(
        Case.id == case_id,
        Case.user_id == user_id
    ).first()

    if not case:
        raise HTTPException(404, "Case not found")

    db.delete(case)
    db.commit()

    return {"deleted": True}