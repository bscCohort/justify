"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

const LEGAL_LABEL: Record<string, string> = {
  business: "Contract / Commercial",
  politics: "Constitution / Government",
  tech: "Cyber / IT",
  sport: "Sports Law",
  entertainment: "Media / IP",
};

export default function HomePage() {
  const [title, setTitle] = useState("");
  const [caseText, setCaseText] = useState("");
  const [pred, setPred] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [savedId, setSavedId] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");

  async function predict() {
    setMsg("");
    setSavedId(null);

    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: caseText }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data?.error || "Prediction failed");
      return;
    }

    setPred(data.category);
    setScores(data.scores || null);
  }

  async function saveCase() {
    setMsg("");

    const res = await fetch(`${API_BASE}/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, case_text: caseText }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMsg(data?.error || "Save failed");
      return;
    }

    setSavedId(data.id);
    setMsg("✅ Saved to DB");
  }

  const displayCategory = pred ? (LEGAL_LABEL[pred] || pred) : null;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">JustiFy Lite</h1>
        <a className="text-blue-600 underline" href="/cases">View Cases</a>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">New Legal Intake</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Title</label>
          <input
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Contract dispute about payment"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Case Text</label>
          <textarea
            className="w-full border rounded p-2 min-h-[140px]"
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            placeholder="Paste the case description here..."
          />
        </div>

        <div className="flex gap-3">
          <button
            className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
            onClick={predict}
            disabled={!caseText.trim()}
          >
            Predict Category
          </button>

          <button
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
            onClick={saveCase}
            disabled={!title.trim() || !caseText.trim()}
          >
            Save Case
          </button>
        </div>

        {msg && <p className="text-sm">{msg}</p>}

        {displayCategory && (
          <div className="border rounded p-4 space-y-2">
            <p className="font-semibold">Suggested Legal Category:</p>
            <p className="text-lg">{displayCategory}</p>

            {scores && (
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Confidence</p>
                <ul className="text-sm space-y-1">
                  {Object.entries(scores)
                    .sort((a, b) => b[1] - a[1])
                    .map(([k, v]) => (
                      <li key={k} className="flex justify-between">
                        <span>{LEGAL_LABEL[k] || k}</span>
                        <span>{(v * 100).toFixed(1)}%</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {savedId && (
              <a className="text-blue-600 underline" href={`/cases/${savedId}`}>
                Open saved case #{savedId}
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
