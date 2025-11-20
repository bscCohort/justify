# justify

```shell
cd backend
rm -rf .venv
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv python-jose requests
pip freeze > requirements.txt
```


### Get Supabase JWT Token for a user 

Use Hoppscotch to log in
POST - https://<PROJECT_ID>.supabase.co/auth/v1/token?grant_type=password
Headers
    Key             Value
    apikey          YOUR_SUPABASE_ANON_KEY
    Content-Type    application/json
Body
    {
    "email": "admin@admin.com",
    "password": "admin"
    }