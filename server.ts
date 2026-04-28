import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/backend/db.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// API Routes
app.post('/api/assistant', (req, res) => {
  const { query } = req.body;
  
  // For idea validation phase, return a mocked analytical response
  setTimeout(() => {
    res.json({
      role: 'assistant',
      content: `Aegix Assistant Analysis complete. Found no immediate correlation for "${query}" in the active alert queue. However, similar beaconing behavior was observed 48 hours ago originating from an unknown endpoint in the 10.0.x.x subnet. I recommend cross-referencing the threat memory database. Do you want me to initiate an endpoint scan?`
    });
  }, 1000);
});

// Setup Vite for development or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer();
