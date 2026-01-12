from flask import Blueprint, request, jsonify
import json

from db import get_conn
from ml_model import predict_scores, vectorizer, model

bp = Blueprint("api", __name__)

@bp.get("/health")
def health():
    return {"status": "ok"}

@bp.get("/")
def index():
    model_ok = vectorizer is not None and model is not None

    db_ok = False
    db_error = None
    try:
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute("select 1;")
                cur.fetchone()
        db_ok = True
    except Exception as e:
        db_error = str(e)

    return jsonify({
        "service": "justify-ml-api",
        "model_connection": "works" if model_ok else "failed",
        "db_connection": "works" if db_ok else "failed",
        "db_error": db_error,
        "try_predict": "POST /predict with JSON {'text': '...'}"
    })

@bp.post("/predict")
def predict():
    payload = request.get_json(silent=True) or {}
    text = (payload.get("text") or "").strip()
    if not text:
        return jsonify({"error": "text is required"}), 400

    pred, scores = predict_scores(text)
    res = {"category": pred}
    if scores is not None:
        res["scores"] = scores

    try:
        with get_conn() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    insert into public.predictions (input_text, predicted_category, scores)
                    values (%s, %s, %s)
                    """,
                    (text, pred, json.dumps(scores) if scores is not None else None),
                )
            conn.commit()
    except Exception as e:
        res["db_warning"] = str(e)

    return jsonify(res)
