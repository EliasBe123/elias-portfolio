import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-animated flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-10 text-center max-w-lg shadow-2xl">
        <p className="text-7xl font-extrabold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-2">
          Hmm, you are not supposed to see this.
        </h1>
        <p className="text-gray-300 mb-6">
          The page you tried to reach doesn't exist (or hasn't been built yet).
        </p>
        <Link
          to="/"
          className="inline-block px-5 py-2 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30 transition"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
