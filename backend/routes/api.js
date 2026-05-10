const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET all active reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find({ status: 'Active' }).sort({ timestamp: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new report
router.post('/reports', async (req, res) => {
  const report = new Report({
    type: req.body.type,
    severity: req.body.severity,
    description: req.body.description,
    location: req.body.location,
    reporterName: req.body.reporterName
  });

  try {
    const newReport = await report.save();
    
    // Broadcast the new report to all connected clients in real-time
    const io = req.app.get('io');
    if (io) {
      io.emit('new_report', newReport);
    }
    
    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH to update report status (e.g., mark as resolved)
router.patch('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    if (req.body.status) {
      report.status = req.body.status;
    }
    
    const updatedReport = await report.save();
    
    // Broadcast status change
    const io = req.app.get('io');
    if (io) {
      io.emit('update_report', updatedReport);
    }
    
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
