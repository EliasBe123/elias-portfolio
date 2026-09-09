import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Skeleton } from "./components/Skeleton";

type Health = {
  status: string;
  uptime: number;
  memory: number;
  cpuLoad: number;
  timestamp: number;
};

type DeployInfo = {
  deployedAt: string | null;
  sha: string | null;
};

function formatUptime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${hrs}h ${mins}m`;
}

export default function Status() {
  const [health, setHealth] = useState<Health | null>(null);
  const [deploy, setDeploy] = useState<DeployInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch("/api/health");
        if (r.ok) setHealth(await r.json());
        else setError("API not reachable");
      } catch {
        setError("API not reachable");
      }
      try {
        const r = await fetch("/api/deploy-info");
        if (r.ok) setDeploy(await r.json());
      } catch {
        /* optional */
      }
    };
    load();
    const id = setInterval(load, 15_000);
    return () => clearInterval(id);
  }, []);

  const ok = !!health && !error;

  return (
    <div className="min-h-screen bg-animated flex flex-col">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main" className="flex-1 max-w-3xl mx-auto p-6 pt-24 w-full text-white">
        <h1 className="text-3xl font-bold gradient-text mb-2">System Status</h1>
        <p className="text-gray-300 mb-8">
          Live status of the API powering this site (hosted on a Raspberry Pi 5).
        </p>

        <div className="glass rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full ${
                ok ? "bg-emerald-400 animate-pulse" : "bg-red-500"
              }`}
            />
            <span className="text-lg font-semibold">
              {ok ? "All systems operational" : "API offline"}
            </span>
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}

          {!health && !error ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          ) : health ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
              <li>
                <span className="text-gray-400">Uptime:</span>{" "}
                {formatUptime(health.uptime)}
              </li>
              <li>
                <span className="text-gray-400">CPU Load (1m):</span>{" "}
                {health.cpuLoad.toFixed(2)}
              </li>
              <li>
                <span className="text-gray-400">Memory:</span>{" "}
                {health.memory.toFixed(1)} MB
              </li>
              <li>
                <span className="text-gray-400">Last check:</span>{" "}
                {new Date(health.timestamp).toLocaleTimeString()}
              </li>
            </ul>
          ) : null}
        </div>

        <div className="glass rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold mb-3">Deployment</h2>
          {!deploy ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ) : (
            <ul className="text-sm text-gray-200 space-y-1">
              <li>
                <span className="text-gray-400">Last deploy:</span>{" "}
                {deploy.deployedAt
                  ? new Date(deploy.deployedAt).toLocaleString()
                  : "unknown"}
              </li>
              <li>
                <span className="text-gray-400">Commit:</span>{" "}
                {deploy.sha ? (
                  <a
                    href={`https://github.com/EliasBe123/elias-portfolio/commit/${deploy.sha}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 underline"
                  >
                    {deploy.sha.slice(0, 7)}
                  </a>
                ) : (
                  "unknown"
                )}
              </li>
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
