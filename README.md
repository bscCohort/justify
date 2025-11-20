# justify

```shell
cd backend
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv python-jose requests
pip freeze > requirements.txt
```


### Run the server

```
uvicorn app.main:app --reload
```