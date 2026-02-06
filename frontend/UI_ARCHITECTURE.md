# UI Architecture and Data Flow (Teaching Notes)

This document explains how data flows from the UI to the backend and back, using the refactored frontend. It is written to be teachable for students learning how modern frameworks stitch together CRUD and API calls.

**What frameworks are in play**
1. Next.js App Router: file-based routing in `frontend/app`.
2. React: UI components and hooks (`useState`, `useEffect`).
3. Fetch API: browser networking for CRUD calls.
4. Tailwind CSS: utility classes in JSX.
5. React Hot Toast: UI notifications.
6. Flask backend: REST API + ML prediction + database (in `backend/`).

**High-level data flow**
1. A page component loads (Next.js route).
2. The page uses a hook to load or mutate data.
3. The hook calls `frontend/lib/api.ts`.
4. `api.ts` performs a `fetch` call to the Flask backend.
5. The backend returns JSON.
6. The hook updates React state.
7. Components render the updated state.

**Routes and their responsibilities**
1. `frontend/app/page.tsx`: static overview (no API calls).
2. `frontend/app/new/page.tsx`: create + predict (POST to backend).
3. `frontend/app/cases/page.tsx`: list cases (GET from backend).
4. `frontend/app/cases/[id]/page.tsx`: read/update/delete (GET/PUT/DELETE).

**Recommended teaching flow (7 steps)**
1. `frontend/app/new`: start with the core user flow (input → predict → save).
2. `frontend/components`: break down the UI into reusable building blocks.
3. `frontend/hooks`: move logic into custom hooks (state + async calls).
4. `frontend/lib/api.ts`: show the data-access layer and error handling.
5. `frontend/types`: explain the shared data contracts for the frontend.
6. `frontend/app/cases`: render the list view + empty/loading states.
7. `frontend/app/cases/[id]`: dynamic route with full CRUD detail view.

**Prettier setup (teach this flow)**
1. Install: `npm i -D prettier` (run from `frontend/`).
2. Config: `.prettierrc.json` sets the formatting rules.
3. Ignore: `.prettierignore` skips build output and vendor folders.
4. Format: `npm run format` (writes changes).
5. Check: `npm run format:check` (CI-safe, no writes).

**Where the API base URL comes from**
1. `frontend/lib/constants.ts` defines `API_BASE`.
2. `API_BASE` uses `NEXT_PUBLIC_API_BASE` if set.
3. If not set, it defaults to `http://127.0.0.1:5000`.
4. All network calls import `API_BASE` so the URL is defined once.

**Data flow per screen**

New Case (`/new`)
1. Page: `frontend/app/new/page.tsx`.
2. UI: `frontend/components/CaseForm.tsx` collects title and case text.
3. Hook: `frontend/hooks/usePredict.ts` calls `predictCategory` in `api.ts`.
4. API: `POST /predict` sends `{ text }` and returns `{ category, scores }`.
5. UI: `frontend/components/CasePreview.tsx` renders the ML result.
6. Save: page calls `createCase` which does `POST /cases` with `{ title, case_text }`.
7. Backend returns `{ id }`, which is shown as a link to the detail page.

Cases List (`/cases`)
1. Page: `frontend/app/cases/page.tsx`.
2. Hook: `frontend/hooks/useCases.ts` calls `getCases` in `api.ts`.
3. API: `GET /cases` returns array of cases.
4. UI: `frontend/components/CaseListItem.tsx` renders each case.

Case Detail (`/cases/[id]`)
1. Page: `frontend/app/cases/[id]/page.tsx` reads the route param `id`.
2. Hook: `frontend/hooks/useCase.ts` calls `getCase` in `api.ts`.
3. API: `GET /cases/:id` returns a single case.
4. UI: page renders case title, category, status, and text.
5. Update: hook calls `updateCase` which does `PUT /cases/:id` with `{ status, notes }`.
6. Delete: hook calls `deleteCase` which does `DELETE /cases/:id`.

**Why this structure is easier**
1. Pages are short and tell the “story” of the screen.
2. Hooks isolate logic so each screen has one place for state.
3. `lib/api.ts` is the single data-access layer for all CRUD calls.
4. Components are small and reusable, mirroring backend “service” ideas.

**CRUD map (frontend → backend)**
1. Create: `createCase` → `POST /cases`.
2. Read list: `getCases` → `GET /cases`.
3. Read single: `getCase` → `GET /cases/:id`.
4. Update: `updateCase` → `PUT /cases/:id`.
5. Delete: `deleteCase` → `DELETE /cases/:id`.
6. Predict: `predictCategory` → `POST /predict`.
















<!-- codex resume 019c3104-c6c6-72b3-83e5-a9e55858f538 -->
