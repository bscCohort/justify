"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:5000";

export default function CasesListPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API_BASE}/cases`);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data?.error || "Failed to load cases");
      setLoading(false);
      return;
    }

    setCases(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6 text-gray-100">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Cases</h1>
        <p className="text-sm text-gray-400">
          Recent saved cases. Click any case to open details.
        </p>
      </header>

      <section className="space-y-3">
        {loading ? (
          <div className="border border-gray-800 bg-gray-900 rounded p-4 text-sm text-gray-300">
            Loading cases...
          </div>
        ) : cases.length === 0 ? (
          <div className="border border-gray-800 bg-gray-900 rounded p-6 space-y-2">
            <p className="font-semibold">No cases yet</p>
            <p className="text-sm text-gray-400">
              Go to <span className="text-blue-400">New Case</span> to create your first one.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <a
                key={c.id}
                href={`/cases/${c.id}`}
                className="block border border-gray-800 bg-gray-900 rounded p-4 hover:border-blue-600 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-gray-100">
                      {c.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      category:{" "}
                      <span className="text-gray-200">{c.predicted_category}</span>
                      {" • "}
                      status:{" "}
                      <span className="text-gray-200">{c.status}</span>
                    </div>
                  </div>

                  <div className="text-sm text-blue-400 shrink-0">
                    Open →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}