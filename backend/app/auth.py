from fastapi import Header, HTTPException

API_KEY = "super-secret-student-key"

def get_current_user(authorization: str = Header(None)):
    """
    Expected header:
    Authorization: ApiKey super-secret-student-key
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    parts = authorization.split(" ")

    if len(parts) != 2 or parts[0] != "ApiKey" or parts[1] != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    # Always return dummy user
    return {"user_id": "test-user"}