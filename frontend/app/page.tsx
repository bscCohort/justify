export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6 text-gray-100">
      <section className="border border-gray-800 bg-gray-900 rounded p-6 space-y-3">
        <h1 className="text-3xl font-bold">JustiFy</h1>
        <p className="text-gray-300">
          A simple legal triage assistant. Users can submit case descriptions,
          get an ML-based category suggestion, and track cases in a database.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="border border-gray-800 bg-gray-900 rounded p-4 space-y-2">
          <h2 className="font-semibold">1) Intake</h2>
          <p className="text-sm text-gray-400">
            User submits title + case description.
          </p>
        </div>
        <div className="border border-gray-800 bg-gray-900 rounded p-4 space-y-2">
          <h2 className="font-semibold">2) Predict</h2>
          <p className="text-sm text-gray-400">
            ML model suggests a legal category.
          </p>
        </div>
        <div className="border border-gray-800 bg-gray-900 rounded p-4 space-y-2">
          <h2 className="font-semibold">3) Track</h2>
          <p className="text-sm text-gray-400">
            Save to DB and manage case status.
          </p>
        </div>
      </section>
    </main>
  );
}