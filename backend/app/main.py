from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="JustiFy API")

# -------------------------------
# CORS (frontend will call backend)
# -------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # we'll restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Root Routes
# -------------------------------

@app.get("/")
def root():
    return {"message": "Welcome to the JustiFy API"}

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "justify-api"}

@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"Hello, {name}. Welcome to JustiFy!"}

from app.routers import example
app.include_router(example.router)