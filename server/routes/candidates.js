const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/candidateController');

// POST /candidates (multipart/form-data for resume)
router.post('/', upload.single('resume'), ctrl.createCandidate);

// GET /candidates
router.get('/', ctrl.getCandidates);

// PUT /candidates/:id/status
router.put('/:id/status', ctrl.updateStatus);

// DELETE /candidates/:id
router.delete('/:id', ctrl.deleteCandidate);

// GET /candidates/metrics
router.get('/metrics/all', ctrl.metrics);

module.exports = router;
