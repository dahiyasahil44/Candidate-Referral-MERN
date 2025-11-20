const Candidate = require('../models/Candidate');
const fs = require('fs');
const path = require('path');

exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;
    const resumeFile = req.file;
    const resumeUrl = resumeFile ? `${process.env.UPLOAD_DIR || 'uploads'}/${resumeFile.filename}` : undefined;

    // in controller createCandidate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/; // adjust for desired phone length

    if (!emailRegex.test(email)) throw new Error('Invalid email format');
    if (!phoneRegex.test(phone)) throw new Error('Invalid phone format');

    const candidate = await Candidate.create({ name, email, phone, jobTitle, resumeUrl });
    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    // optional query filters: jobTitle, status, q (search)
    const { jobTitle, status, q } = req.query;
    const filter = {};
    if (jobTitle) filter.jobTitle = { $regex: jobTitle, $options: 'i' };
    if (status) filter.status = status;
    if (q) filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { jobTitle: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } }
    ];

    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!['Pending','Reviewed','Hired'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
    if (!candidate) return res.status(404).json({ error: 'Not found' });
    res.json(candidate);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) return res.status(404).json({ error: 'Not found' });

    // delete resume file if stored locally
    if (candidate.resumeUrl && candidate.resumeUrl.startsWith((process.env.UPLOAD_DIR || 'uploads'))) {
      const p = path.resolve(candidate.resumeUrl);
      fs.unlink(p, err => { /* ignore errors */ });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.metrics = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const pending = await Candidate.countDocuments({ status: 'Pending' });
    const reviewed = await Candidate.countDocuments({ status: 'Reviewed' });
    const hired = await Candidate.countDocuments({ status: 'Hired' });
    res.json({ total, pending, reviewed, hired });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
