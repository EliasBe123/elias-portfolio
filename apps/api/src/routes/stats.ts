import express from "express";
import db from "../db.js";

const router = express.Router();

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

export default router;
