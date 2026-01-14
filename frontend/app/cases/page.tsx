"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default function CasesListPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    const res = await fetch(`${API_BASE}/cases`);
    const data = await res.json();
    if (!res.ok) {
      setErr(data?.error || "Failed to load cases");
      return;
    }
    setCases(data);
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cases</h1>
        <a className="text-blue-600 underline" href="/">New Case</a>
      </header>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="border rounded">
        {cases.length === 0 ? (
          <p className="p-4 text-sm">No cases yet.</p>
        ) : (
          <ul>
            {cases.map((c) => (
              <li key={c.id} className="border-b last:border-b-0 p-4">
                <a className="underline" href={`/cases/${c.id}`}>
                  <div className="font-semibold">{c.title}</div>
                </a>
                <div className="text-sm text-gray-600 flex gap-4">
                  <span>category: {c.predicted_category}</span>
                  <span>status: {c.status}</span>
                  <span>id: {c.id}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="border rounded px-3 py-2" onClick={load}>
        Refresh
      </button>
    </main>
  );
}
