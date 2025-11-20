const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: { type: String, enum: ['Pending','Reviewed','Hired'], default: 'Pending' },
  resumeUrl: { type: String }, // local path or S3 URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);
