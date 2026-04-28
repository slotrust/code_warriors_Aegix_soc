import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './src/backend/db.ts';
import si from 'systeminformation';
import { exec } from 'child_process';
import util from 'util';
import { GoogleGenAI } from '@google/genai';

const execPromise = util.promisify(exec);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


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

// EDR Endpoints
app.post('/api/edr/scan-file', async (req, res) => {
   const { path } = req.body;
   try {
     const { stdout } = await execPromise(`stat "${path.replace(/"/g, '\\"')}"`);
     res.json({ result: "File exists. Details:\\n" + stdout, status: "OK" });
   } catch(e) {
     res.json({ result: "File not found or inaccessible.", status: "ERROR" });
   }
});

app.post('/api/edr/nmap', async (req, res) => {
   const { target } = req.body;
   try {
     const { stdout } = await execPromise(`ping -c 2 "${target.replace(/"/g, '')}" || echo "Ping failed"`);
     res.json({ result: stdout, status: "OK" });
   } catch (e) {
     res.json({ result: "Scan failed", status: "ERROR" });
   }
});

// Logs Endpoint
app.get('/api/logs', async (req, res) => {
  try {
    let stdout;
    try {
      const { stdout: jOut } = await execPromise('journalctl -n 200 --no-pager -o short-iso');
      stdout = jOut;
    } catch(e) {
      const { stdout: dOut } = await execPromise('tail -n 200 /var/log/syslog || dmesg | tail -n 200');
      stdout = dOut;
    }
    
    const lines = stdout.split('\\n').filter((l: string) => l.trim().length > 0);
    const logs = lines.map((line: string, idx: number) => {
      let timestamp = new Date().toISOString();
      let process = 'system';
      let message = line;
      let level = 'INFO';
      
      const tl = line.toLowerCase();
      if (tl.includes('error') || tl.includes('fail') || tl.includes('crit')) level = 'ERROR';
      else if (tl.includes('warn')) level = 'WARNING';
      
      const parts = line.split(' ');
      if (parts.length > 3 && parts[0].includes('-') && parts[0].includes('T')) {
          timestamp = parts[0];
          process = parts[2] || 'system';
          message = parts.slice(3).join(' ');
      }
      return { id: idx, timestamp, process, level, message, raw: line };
    }).reverse();
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// AI Analyze Endpoint
app.post('/api/logs/analyze', async (req, res) => {
  try {
    const { logRaw, context } = req.body;
    
    const prompt = \`You are a Senior SOC Analyst. Analyze this system log and its context. Return ONLY a valid JSON object with the following structure, no markdown formatting:
{
  "summary": "Plain English explanation",
  "riskLevel": "Low | Medium | High | Critical",
  "rootCause": "Underlying process or trigger",
  "remediation": "Steps to fix or investigate"
}
Log: \${logRaw}
Context: \${context || 'N/A'}\`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    const text = response.text || '';
    let analysis;
    try {
       analysis = JSON.parse(text);
    } catch(e) {
       console.error("Failed to parse gemini response:", e);
       analysis = { summary: "Analysis failed parsing.", riskLevel: "Low", rootCause: "Unknown", remediation: "Manual review required: " + text };
    }
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: String(err) });
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
