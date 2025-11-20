require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const candidatesRoutes = require('./routes/candidates');

const app = express();
app.use(cors());
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: true }));
app.use(`/${process.env.UPLOAD_DIR || 'uploads'}`, express.static(process.env.UPLOAD_DIR || 'uploads'));

connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidatesRoutes);

// basic error handler for multer file type rejections
app.use(function(err, req, res, next) {
  if (err instanceof Error && err.message.includes('Only .pdf')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
