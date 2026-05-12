import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type S = "ok" | "down" | "loading";

export default function StatusBadge() {
  const [status, setStatus] = useState<S>("loading");

  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      try {
        const r = await fetch("/api/health", { cache: "no-store" });
        if (!cancelled) setStatus(r.ok ? "ok" : "down");
      } catch {
        if (!cancelled) setStatus("down");
      }
    };

    ping();
    const id = setInterval(ping, 30_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const color =
    status === "ok"
      ? "bg-emerald-400"
      : status === "down"
      ? "bg-red-500"
      : "bg-yellow-400";
  const label =
    status === "ok"
      ? "All systems operational"
      : status === "down"
      ? "Down"
      : "Checking…";

  return (
    <Link
      to="/status"
      aria-label={`System status: ${label}`}
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <span className={`w-2 h-2 rounded-full ${color} animate-pulse`} />
      <span className="text-xs text-gray-300 hidden md:inline">{label}</span>
    </Link>
  );
}
