def success(data=None, message="OK"):
    return {
        "success": True,
        "message": message,
        "data": data,
    }

def error(message, status=400):
    return {
        "success": False,
        "message": message,
        "data": None,
        "status": status,
    }