import express from 'express';
import path from 'node:path';
import compression from 'compression';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.set('trust proxy', true);
app.use(compression());

// --- Static site (built by Vite) ---
const staticDir = path.resolve(__dirname, '../../web/dist');
app.use(express.static(staticDir, { maxAge: '30d', index: false }));

// --- Basic API ---
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// --- SPA fallback ---
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});