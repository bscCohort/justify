"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

const LEGAL_LABEL: Record<string, string> = {
  business: "Contract / Commercial",
  politics: "Constitution / Government",
  tech: "Cyber / IT",
  sport: "Sports Law",
  entertainment: "Media / IP",
};

export default function NewCasePage() {
  const [title, setTitle] = useState("");
  const [caseText, setCaseText] = useState("");
  const [pred, setPred] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number> | null>(null);
  const [savedId, setSavedId] = useState<number | null>(null);

  async function predict() {
    setSavedId(null);

    if (!caseText.trim()) {
      toast.error("Please enter case text");
      return;
    }

    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: caseText }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.error || "Prediction failed");
      return;
    }

    setPred(data.category);
    setScores(data.scores || null);
    toast.success("Prediction ready");
  }

  async function saveCase() {
    if (!title.trim() || !caseText.trim()) {
      toast.error("Title and case text are required");
      return;
    }

    const res = await fetch(`${API_BASE}/cases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, case_text: caseText }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.error || "Save failed");
      return;
    }

    setSavedId(data.id);
    toast.success("Saved to DB");
  }

  const displayCategory = pred ? (LEGAL_LABEL[pred] || pred) : null;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">New Legal Intake</h1>
        <p className="text-sm text-gray-400">
          Paste the case description, get an ML suggestion, then save it.
        </p>
      </header>

      <section className="space-y-3 border border-gray-800 bg-gray-900 rounded p-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Title</label>
          <input
            className="w-full border border-gray-700 rounded p-2 bg-gray-800 text-gray-100 placeholder-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Contract dispute about payment"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">Case Text</label>
          <textarea
            className="w-full border border-gray-700 rounded p-2 min-h-[160px] bg-gray-800 text-gray-100 placeholder-gray-400"
            value={caseText}
            onChange={(e) => setCaseText(e.target.value)}
            placeholder="Paste the case description here..."
          />
        </div>

        <div className="flex gap-3">
          <button
            className="bg-gray-100 text-black rounded px-4 py-2 disabled:opacity-50"
            onClick={predict}
            disabled={!caseText.trim()}
          >
            Predict Category
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 disabled:opacity-50"
            onClick={saveCase}
            disabled={!title.trim() || !caseText.trim()}
          >
            Save Case
          </button>
        </div>
      </section>

      {displayCategory && (
        <section className="border border-gray-800 bg-gray-900 rounded p-4 space-y-3">
          <div>
            <p className="text-sm text-gray-400">Suggested category</p>
            <p className="text-xl font-semibold text-gray-100">
              {displayCategory}
            </p>
          </div>

          {scores && (
            <div className="pt-2">
              <p className="text-sm font-medium mb-2 text-gray-300">
                Confidence
              </p>
              <ul className="text-sm space-y-1">
                {Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .map(([k, v]) => (
                    <li key={k} className="flex justify-between text-gray-200">
                      <span>{LEGAL_LABEL[k] || k}</span>
                      <span>{(v * 100).toFixed(1)}%</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {savedId && (
            <a
              className="text-blue-400 hover:text-blue-300 underline"
              href={`/cases/${savedId}`}
            >
              Open saved case #{savedId}
            </a>
          )}
        </section>
      )}
    </main>
  );
}