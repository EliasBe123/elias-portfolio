import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use('/web', express.static(path.join(__dirname, 'web/dist')));

// API routes
app.get('/api/hello', (req, res) => res.json({ msg: 'Hello World' }));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web/dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
