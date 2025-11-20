# justify

```shell
cd backend
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv
pip freeze > requirements.txt
```