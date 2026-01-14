"use client";

import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("new");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    const res = await fetch(`${API_BASE}/cases/${id}`);
    const body = await res.json();
    if (!res.ok) {
      setMsg(body?.error || "Failed to load case");
      return;
    }
    setData(body);
    setStatus(body.status || "new");
    setNotes(body.notes || "");
  }

  async function save() {
    setMsg("");
    const res = await fetch(`${API_BASE}/cases/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    });
    const body = await res.json();
    if (!res.ok) {
      setMsg(body?.error || "Update failed");
      return;
    }
    setData(body);
    setMsg("✅ Updated");
  }

  async function remove() {
    setMsg("");
    const res = await fetch(`${API_BASE}/cases/${id}`, { method: "DELETE" });
    const body = await res.json();
    if (!res.ok) {
      setMsg(body?.error || "Delete failed");
      return;
    }
    window.location.href = "/cases";
  }

  useEffect(() => { load(); }, [id]);

  if (!data) {
    return <main className="max-w-3xl mx-auto p-6">Loading...</main>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case #{data.id}</h1>
        <a className="text-blue-600 underline" href="/cases">Back to list</a>
      </header>

      {msg && <p className="text-sm">{msg}</p>}

      <div className="border rounded p-4 space-y-2">
        <div className="text-xl font-semibold">{data.title}</div>
        <div className="text-sm text-gray-600">
          category: {data.predicted_category} • status: {data.status}
        </div>
        <pre className="whitespace-pre-wrap text-sm mt-3 border rounded p-3 bg-gray-50">
          {data.case_text}
        </pre>
      </div>

      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Reviewer Update</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium">Status</label>
          <select className="border rounded p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="new">new</option>
            <option value="reviewing">reviewing</option>
            <option value="resolved">resolved</option>
            <option value="needs_clarification">needs_clarification</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Notes</label>
          <textarea className="w-full border rounded p-2 min-h-[120px]" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white rounded px-4 py-2" onClick={save}>
            Save
          </button>
          <button className="border rounded px-4 py-2" onClick={remove}>
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}
