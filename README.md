# justify

```shell
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
# pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv python-jose requests
pip install flask joblib scikit-learn python-dotenv psycopg[binary]
pip freeze > requirements.txt
```


### Run the server

```
uvicorn app.main:app --reload
```


### Setup NextJS Project

```shell
cd frontend
npx create-next-app@latest .


(.venv) @bscCohort ➜ /workspaces/justify/frontend (main) $ npx create-next-app@latest .
Need to install the following packages:
create-next-app@16.1.1
Ok to proceed? (y) y
✔ Would you like to use the recommended Next.js defaults? › Yes, use recommended defaults
Creating a new Next.js app in /workspaces/justify/frontend.

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- next
- react
- react-dom

Installing devDependencies:
- @tailwindcss/postcss
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- typescript


added 363 packages, and audited 364 packages in 53s

145 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Generating route types...
✓ Types generated successfully

Success! Created frontend at /workspaces/justify/frontend

npm notice 
npm notice New major version of npm available! 9.8.1 -> 11.7.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.7.0
npm notice Run npm install -g npm@11.7.0 to update!
npm notice 


(.venv) @bscCohort ➜ /workspaces/justify/frontend (main) $ npm install @supabase/supabase-js

added 10 packages, and audited 374 packages in 5s

145 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
(.venv) @bscCohort ➜ /workspaces/justify/frontend (main) $ 
```