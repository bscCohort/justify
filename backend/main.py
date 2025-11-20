from fastapi import FastAPI

app = FastAPI(title="JustiFy API")


@app.get("/")
def root():
    return {"message": "Welcome to the JustiFy API"}


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "justify-api"}


@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"Hello, {name}. Welcome to JustiFy!"}