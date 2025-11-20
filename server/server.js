require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const candidatesRoutes = require('./routes/candidates');

const app = express();

// ---- CORS CONFIG (IMPORTANT FOR VERCEL FRONTEND) ----
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));

// ---- MIDDLEWARE ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---- STATIC FILES (uploads) ----
const uploadsDir = process.env.UPLOAD_DIR || 'uploads';
app.use(`/${uploadsDir}`, express.static(uploadsDir));

// ---- CONNECT TO MONGO ----
connectDB(process.env.MONGO_URI);

// ---- ROUTES ----
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidatesRoutes);

// ---- MULTER ERROR HANDLER ----
app.use((err, req, res, next) => {
  if (err?.message?.includes('Only .pdf')) {
    return res.status(400).json({ error: err.message });
  }
  console.error("ERROR:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ---- PORT LISTENER (REQUIRED FOR RENDER) ----
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// module.exports = app;