var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_vite = require("vite");
var import_multer = __toESM(require("multer"), 1);
var app = (0, import_express.default)();
var PORT = 3e3;
var upload = (0, import_multer.default)({
  limits: { fileSize: 150 * 1024 * 1024 },
  storage: import_multer.default.memoryStorage()
});
app.use(import_express.default.json({ limit: "150mb" }));
app.use(import_express.default.urlencoded({ extended: true, limit: "150mb" }));
var VALID_VIDEO_KEYS = {
  roofseal: "roofseal-video.mp4",
  process: "process-video.mp4",
  "why-aquaseal": "why-aquaseal-video.mp4"
};
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
});
app.get("/api/videos", (req, res) => {
  try {
    const publicDir = import_path.default.join(process.cwd(), "public");
    const status = {};
    for (const [key, filename] of Object.entries(VALID_VIDEO_KEYS)) {
      const filePath = import_path.default.join(publicDir, filename);
      if (import_fs.default.existsSync(filePath)) {
        const stat = import_fs.default.statSync(filePath);
        status[key] = {
          exists: true,
          size: stat.size,
          url: `/${filename}?t=${stat.mtimeMs}`,
          updatedAt: stat.mtime.toISOString()
        };
      } else {
        status[key] = {
          exists: false,
          size: 0,
          url: `/${filename}`,
          updatedAt: ""
        };
      }
    }
    res.json({ success: true, videos: status });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
app.post("/api/upload-video", upload.single("file"), (req, res) => {
  try {
    const key = (req.body.key || "").trim();
    const filename = VALID_VIDEO_KEYS[key];
    if (!filename) {
      res.status(400).json({
        success: false,
        error: `Invalid video key: "${key}". Allowed keys: ${Object.keys(VALID_VIDEO_KEYS).join(", ")}`
      });
      return;
    }
    if (!req.file || !req.file.buffer) {
      res.status(400).json({ success: false, error: "No video file provided" });
      return;
    }
    const publicDir = import_path.default.join(process.cwd(), "public");
    if (!import_fs.default.existsSync(publicDir)) {
      import_fs.default.mkdirSync(publicDir, { recursive: true });
    }
    const publicFilePath = import_path.default.join(publicDir, filename);
    import_fs.default.writeFileSync(publicFilePath, req.file.buffer);
    const distDir = import_path.default.join(process.cwd(), "dist");
    if (import_fs.default.existsSync(distDir)) {
      const distFilePath = import_path.default.join(distDir, filename);
      import_fs.default.writeFileSync(distFilePath, req.file.buffer);
    }
    const timestamp = Date.now();
    const videoUrl = `/${filename}?t=${timestamp}`;
    console.log(`[Video Server] Successfully updated ${filename} (${req.file.buffer.length} bytes) for key "${key}"`);
    res.json({
      success: true,
      message: `Video permanently saved to server for key "${key}"`,
      url: videoUrl,
      size: req.file.buffer.length,
      timestamp
    });
  } catch (err) {
    console.error("[Video Server] Upload error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
var DATA_DIR = import_path.default.join(process.cwd(), "data");
var LEADS_FILE = import_path.default.join(DATA_DIR, "leads.json");
function getLeads() {
  try {
    if (!import_fs.default.existsSync(DATA_DIR)) {
      import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (import_fs.default.existsSync(LEADS_FILE)) {
      const data = import_fs.default.readFileSync(LEADS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("[Leads Storage] Error reading leads file:", e);
  }
  return [];
}
function saveLeads(leads) {
  try {
    if (!import_fs.default.existsSync(DATA_DIR)) {
      import_fs.default.mkdirSync(DATA_DIR, { recursive: true });
    }
    import_fs.default.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (e) {
    console.error("[Leads Storage] Error writing leads file:", e);
  }
}
app.post("/api/inquiries", (req, res) => {
  try {
    const { name, phone, location, structureType, problemArea, message, type } = req.body;
    if (!name || !phone) {
      res.status(400).json({ success: false, error: "Name and phone number are required." });
      return;
    }
    const leads = getLeads();
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      type: type || "inspection",
      name: String(name).trim(),
      phone: String(phone).trim(),
      location: String(location || "").trim(),
      structureType: String(structureType || "").trim(),
      problemArea: String(problemArea || "").trim(),
      message: String(message || "").trim()
    };
    leads.unshift(newLead);
    saveLeads(leads);
    console.log(`[Leads Storage] New ${newLead.type} lead received from ${newLead.name} (${newLead.phone})`);
    res.json({ success: true, lead: newLead, totalLeads: leads.length });
  } catch (err) {
    console.error("[Leads Storage] Error logging lead:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.get("/api/inquiries", (req, res) => {
  try {
    const leads = getLeads();
    res.json({ success: true, count: leads.length, leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
app.delete("/api/inquiries/:id", (req, res) => {
  try {
    const { id } = req.params;
    let leads = getLeads();
    leads = leads.filter((l) => l.id !== id);
    saveLeads(leads);
    res.json({ success: true, remaining: leads.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
