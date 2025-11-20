from fastapi import Header, HTTPException

API_KEY = "super-secret-student-key"

def verify_api_key(authorization: str = Header(None)):
    """
    Expected format:
    Authorization: ApiKey super-secret-student-key
    """

    print(f"Received authorization header: '{authorization}'")  # Add this
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    parts = authorization.split(" ")

    if len(parts) != 2 or parts[0] != "ApiKey" or parts[1] != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API Key")

    return True