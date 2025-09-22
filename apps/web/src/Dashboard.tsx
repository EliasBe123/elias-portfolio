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
  uptime: number;
  memory: number;
  cpuLoad: number;
  timestamp: number;
};

const ranges = [
  { label: '5 min', value: 5 * 60 * 1000 },
  { label: '1 hour', value: 60 * 60 * 1000 },
  { label: '24 hours', value: 24 * 60 * 60 * 1000 },
];

export default function Dashboard() {
  const [healthHistory, setHealthHistory] = useState<HealthStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState(ranges[0].value);

  function formatUptime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  }

  // Fetch health history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/stats/health-history');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: HealthStatus[] = await res.json();
        setHealthHistory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const latest = healthHistory[healthHistory.length - 1];

  // Filter data based on selected range
  const filteredHistory = healthHistory.filter(
    (h) => h.timestamp >= Date.now() - selectedRange
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6 pt-20 space-y-8">
        <h1 className="text-3xl font-bold text-center">Server Dashboard</h1>

        {loading && <p>Loading server status...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {latest && (
          <div className="space-y-6">
            {/* Latest status */}
            <div className="flex justify-around p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p>
                <strong>Uptime:</strong> {formatUptime(latest.uptime)}
              </p>
              <p>
                <strong>CPU Load:</strong> {latest.cpuLoad.toFixed(2)}
              </p>
              <p>
                <strong>Memory:</strong> {latest.memory.toFixed(1)} MB
              </p>
            </div>

            {/* Time range selector */}
            <div className="flex gap-2">
              {ranges.map((r) => (
                <button
                  key={r.value}
                  className={`px-3 py-1 rounded ${
                    selectedRange === r.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                  onClick={() => setSelectedRange(r.value)}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* History chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">CPU & Memory Usage</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={filteredHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8884d8" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(ts) =>
                      new Date(ts).toLocaleTimeString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(ts) => new Date(ts).toLocaleTimeString()}
                  />
                  <Line type="monotone" dataKey="cpuLoad" stroke="#f85ea4ff" dot={false} />
                  <Line type="monotone" dataKey="memory" stroke="#82ca9d" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
