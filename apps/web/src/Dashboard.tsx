import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

type HealthStatus = {
  status: string;
  uptime?: number;
  [key: string]: any;
};

export default function Dashboard() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHealth(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div>
        <Navbar />
            <main className="max-w-3xl mx-auto p-6 pt-20">
            <h1 className="text-3xl font-bold mb-4">Server Dashboard</h1>

            {loading && <p>Loading server status...</p>}
            {error && <p className="text-red-600">Error: {error}</p>}

            {health && (
                <div className="space-y-2">
                <p>
                    <strong>Status:</strong> {health.status}
                </p>
                {health.uptime !== undefined && (
                    <p>
                    <strong>Uptime:</strong> {health.uptime}s
                    </p>
                )}
                {/* Add more fields from your health API if needed */}
                </div>
            )}
            </main>
    </div>
  );
}
