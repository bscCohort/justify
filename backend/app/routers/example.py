from fastapi import APIRouter

router = APIRouter(prefix="/example", tags=["Example"])

@router.get("test")
def example_test():
    return {"message": "This message is coming from example router!"}