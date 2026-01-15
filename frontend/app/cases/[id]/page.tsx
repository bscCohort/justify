"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default function CaseDetailPage() {
  const params = useParams();
  const id = params.id as string;

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
    const res = await fetch(`${API_BASE}/cases/${id}`, {
      method: "DELETE",
    });

    const body = await res.json();
    if (!res.ok) {
      setMsg(body?.error || "Delete failed");
      return;
    }

    window.location.href = "/cases";
  }

  useEffect(() => {
    if (id) load();
  }, [id]);

  if (!data) {
    return (
      <main className="max-w-3xl mx-auto p-6 text-gray-100">
        Loading...
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Case #{data.id}</h1>
      </header>

      {msg && <p className="text-sm text-gray-300">{msg}</p>}

      {/* Case Info */}
      <div className="border border-gray-700 rounded p-4 space-y-2 bg-gray-900">
        <div className="text-xl font-semibold text-gray-100">
          {data.title}
        </div>
        <div className="text-sm text-gray-400">
          category: {data.predicted_category} • status: {data.status}
        </div>
        <pre className="whitespace-pre-wrap text-sm mt-3 border border-gray-700 rounded p-3 bg-gray-800 text-gray-100">
          {data.case_text}
        </pre>
      </div>

      {/* Reviewer Update */}
      <div className="border border-gray-700 rounded p-4 space-y-4 bg-gray-900">
        <h2 className="font-semibold text-gray-100">Reviewer Update</h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">
            Status
          </label>
          <select
            className="border border-gray-700 rounded p-2 bg-gray-800 text-gray-100"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">new</option>
            <option value="reviewing">reviewing</option>
            <option value="resolved">resolved</option>
            <option value="needs_clarification">
              needs_clarification
            </option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-300">
            Notes
          </label>
          <textarea
            className="w-full border border-gray-700 rounded p-2 min-h-[120px] bg-gray-800 text-gray-100 placeholder-gray-400"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal review notes..."
          />
        </div>

        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
            onClick={save}
          >
            Save
          </button>
          <button
            className="border border-gray-600 rounded px-4 py-2 text-gray-200 hover:bg-gray-800"
            onClick={remove}
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
}