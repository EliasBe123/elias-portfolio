// routes/stats.ts
import express from "express";
import os from "os";
import db from "../db.js";

const router = express.Router();

// --- Visits statistics ---
router.get("/visits", (_req, res) => {
  const stmt = db.prepare(`
    SELECT 
      date(timestamp) as day,
      COUNT(*) as visits
    FROM visits
    GROUP BY day
    ORDER BY day DESC
    LIMIT 30
  `);

  const data = stmt.all();
  res.json(data);
});

// --- Health history ---
// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS health_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uptime REAL,
    memory REAL,
    cpuLoad REAL,
    timestamp INTEGER
  )
`);

// Background job: log server stats every 5s
setInterval(() => {
  const uptime = process.uptime();
  const memory = process.memoryUsage().rss / 1024 / 1024; // MB
  const cpuLoad = os.loadavg()[0]; // 1-min avg
  const timestamp = Date.now();

  db.prepare(`
    INSERT INTO health_history (uptime, memory, cpuLoad, timestamp)
    VALUES (?, ?, ?, ?)
  `).run(uptime, memory, cpuLoad, timestamp);

  // Optional cleanup: keep only last 24h
  db.prepare(`
    DELETE FROM health_history
    WHERE timestamp < ?
  `).run(Date.now() - 24 * 60 * 60 * 1000);
}, 5000);

// API endpoint: get latest history
router.get("/health-history", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM health_history ORDER BY timestamp DESC LIMIT 100")
    .all();
  res.json(rows.reverse()); // chronological order
});

export default router;
