import express from "express";
import path from "node:path";
import compression from "compression";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const isProd = process.env.NODE_ENV === "production";

app.set("trust proxy", true);
app.use(compression());

// --- API routes ---
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// --- Frontend handling ---
if (isProd) {
  // Serve built frontend
  const staticDir = path.resolve(__dirname, "../../web/dist");
  app.use(express.static(staticDir, { maxAge: "30d", index: false }));

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
} else {
  // Dev mode: proxy everything except /api to Vite
  app.use(
    /^\/(?!api).*/, // regex: match paths NOT starting with /api
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
    })
  );
}

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT} (${isProd ? "prod" : "dev"} mode)`);
});
