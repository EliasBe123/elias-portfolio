// routes/health.ts
import os from "os";
import express from "express";

const router = express.Router();

router.get("/health", (_, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(), // seconds
    memory: process.memoryUsage().rss / 1024 / 1024, // MB
    cpuLoad: os.loadavg()[0], // 1-min load average
    timestamp: Date.now(),
  });
});

export default router;
