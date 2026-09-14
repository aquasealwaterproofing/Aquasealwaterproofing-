import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';

const app = express();
const PORT = 3000;

// Maximum video upload size: 150MB
const upload = multer({
  limits: { fileSize: 150 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ extended: true, limit: '150mb' }));

const VALID_VIDEO_KEYS: Record<string, string> = {
  roofseal: 'roofseal-video.mp4',
  process: 'process-video.mp4',
  'why-aquaseal': 'why-aquaseal-video.mp4',
};

// API Route: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API Route: Get video registry status
app.get('/api/videos', (req, res) => {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const status: Record<string, { exists: boolean; size: number; url: string; updatedAt: string }> = {};

    for (const [key, filename] of Object.entries(VALID_VIDEO_KEYS)) {
      const filePath = path.join(publicDir, filename);
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        status[key] = {
          exists: true,
          size: stat.size,
          url: `/${filename}?t=${stat.mtimeMs}`,
          updatedAt: stat.mtime.toISOString(),
        };
      } else {
        status[key] = {
          exists: false,
          size: 0,
          url: `/${filename}`,
          updatedAt: '',
        };
      }
    }

    res.json({ success: true, videos: status });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// API Route: Upload video permanently to server
app.post('/api/upload-video', upload.single('file'), (req, res) => {
  try {
    const key = (req.body.key || '').trim();
    const filename = VALID_VIDEO_KEYS[key];

    if (!filename) {
      res.status(400).json({
        success: false,
        error: `Invalid video key: "${key}". Allowed keys: ${Object.keys(VALID_VIDEO_KEYS).join(', ')}`,
      });
      return;
    }

    if (!req.file || !req.file.buffer) {
      res.status(400).json({ success: false, error: 'No video file provided' });
      return;
    }

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Save directly to public folder so it's permanently part of the website
    const publicFilePath = path.join(publicDir, filename);
    fs.writeFileSync(publicFilePath, req.file.buffer);

    // Also mirror to dist folder if dist exists (for live production serving)
    const distDir = path.join(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      const distFilePath = path.join(distDir, filename);
      fs.writeFileSync(distFilePath, req.file.buffer);
    }

    const timestamp = Date.now();
    const videoUrl = `/${filename}?t=${timestamp}`;

    console.log(`[Video Server] Successfully updated ${filename} (${req.file.buffer.length} bytes) for key "${key}"`);

    res.json({
      success: true,
      message: `Video permanently saved to server for key "${key}"`,
      url: videoUrl,
      size: req.file.buffer.length,
      timestamp,
    });
  } catch (err: any) {
    console.error('[Video Server] Upload error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// API Routes: Inquiries & Leads Storage
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function getLeads(): any[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('[Leads Storage] Error reading leads file:', e);
  }
  return [];
}

function saveLeads(leads: any[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Leads Storage] Error writing leads file:', e);
  }
}

// POST /api/inquiries - Save a new customer inquiry
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, phone, location, structureType, problemArea, message, type } = req.body;
    
    if (!name || !phone) {
      res.status(400).json({ success: false, error: 'Name and phone number are required.' });
      return;
    }

    const leads = getLeads();
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      type: type || 'inspection',
      name: String(name).trim(),
      phone: String(phone).trim(),
      location: String(location || '').trim(),
      structureType: String(structureType || '').trim(),
      problemArea: String(problemArea || '').trim(),
      message: String(message || '').trim(),
    };

    leads.unshift(newLead);
    saveLeads(leads);

    console.log(`[Leads Storage] New ${newLead.type} lead received from ${newLead.name} (${newLead.phone})`);
    res.json({ success: true, lead: newLead, totalLeads: leads.length });
  } catch (err: any) {
    console.error('[Leads Storage] Error logging lead:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/inquiries - Retrieve all logged inquiries (Owner/Admin)
app.get('/api/inquiries', (req, res) => {
  try {
    const leads = getLeads();
    res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/inquiries/:id - Delete a specific lead
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    let leads = getLeads();
    leads = leads.filter((l) => l.id !== id);
    saveLeads(leads);
    res.json({ success: true, remaining: leads.length });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
