// routes/deploy-info.ts
import express from "express";

const router = express.Router();

router.get("/deploy-info", (_req, res) => {
  res.json({
    deployedAt: process.env.DEPLOYED_AT ?? null,
    sha: process.env.GIT_SHA ?? null,
  });
});

export default router;
