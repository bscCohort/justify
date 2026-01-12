# backend/schema.py
from db import get_conn

SCHEMA_SQL = """
create table if not exists public.predictions (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  input_text text not null,
  predicted_category text not null,
  scores jsonb
);

create index if not exists idx_predictions_created_at
  on public.predictions (created_at desc);

create index if not exists idx_predictions_category
  on public.predictions (predicted_category);
"""

def ensure_schema():
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(SCHEMA_SQL)
        conn.commit()
    print("✅ DB schema ready: public.predictions")
