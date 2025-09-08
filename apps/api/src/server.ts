import express from 'express';
import path from 'node:path';
import compression from 'compression';
import { fileURLToPath } from "url";
import healthRouter from "./routes/health.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.set('trust proxy', true);
app.use(compression());

// --- Serve static frontend build ---
const staticDir = path.resolve(__dirname, '../web/dist');
app.use(express.static(staticDir, { maxAge: '30d', index: false }));

// --- API routes ---
app.use("/api", healthRouter);

// --- SPA fallback for all other frontend routes ---
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
