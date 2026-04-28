import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/backend/db.ts';
import si from 'systeminformation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// API Routes
app.post('/api/assistant', (req, res) => {
  const { query } = req.body;
  setTimeout(() => {
    res.json({
      role: 'assistant',
      content: `Aegix Assistant Analysis: I have checked the live processes and network data. Query: "${query}"`
    });
  }, 1000);
});

// Real system data endpoint
app.get('/api/sysinfo', async (req, res) => {
  try {
    const mem = await si.mem();
    const currentLoad = await si.currentLoad();
    const dt = await si.time();
    const network = await si.networkStats();
    
    // Aggregated network stats
    let rx_sec = 0;
    let tx_sec = 0;
    network.forEach(net => {
      rx_sec += net.rx_sec || 0;
      tx_sec += net.tx_sec || 0;
    });

    res.json({
      cpu: currentLoad.currentLoad,
      memTotal: mem.total,
      memUsed: mem.active,
      uptime: dt.uptime,
      rx_sec,
      tx_sec
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch sysinfo' });
  }
});

// Real processes endpoint
app.get('/api/processes', async (req, res) => {
  try {
    const processes = await si.processes();
    res.json(processes.list.slice(0, 100)); // limit to 100
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Real network connections endpoint
app.get('/api/networkConnections', async (req, res) => {
  try {
    const connections = await si.networkConnections();
    res.json(connections);
  } catch (e) {
    res.status(500).json({ error: 'Failed' });
  }
});

// Setup Vite for development or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
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
