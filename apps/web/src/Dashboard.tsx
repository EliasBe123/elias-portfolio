import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type HealthStatus = {
  status: string;
  uptime: number;
  memory?: number;
  cpuLoad?: number;
  timestamp: number;
};



export default function Dashboard() {
  const [healthHistory, setHealthHistory] = useState<HealthStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    function formatUptime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
    }
  useEffect(() => {
  fetch("/api/stats/visits")
    .then(res => res.json())
    .then(data => console.log("Visit stats:", data));
  }, []);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: HealthStatus = await res.json();

        setHealthHistory((prev) => [...prev.slice(-19), data]); // Keep last 20 points
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth(); // initial fetch
    const interval = setInterval(fetchHealth, 3000); // fetch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 pt-20 space-y-8">
        <h1 className="text-3xl font-bold text-center">Server Dashboard</h1>

        {loading && <p>Loading server status...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {healthHistory.length > 0 && (
          <div className="space-y-6">
            {/* Latest status */}
            <div className="flex justify-around p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p>
                <strong>Status:</strong> {healthHistory[healthHistory.length - 1].status}
              </p>
              <p>
                <strong>Uptime:</strong>{' '}
                {healthHistory[healthHistory.length - 1].uptime !== undefined
                    ? formatUptime(healthHistory[healthHistory.length - 1].uptime)
                    : 'N/A'}
                </p>
            </div>

            {/* Mini line chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">CPU & Memory Usage</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={healthHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="cpuLoad"
                    stroke="#f85ea4ff"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="memory"
                    stroke="#82ca9d"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
