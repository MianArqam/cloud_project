const express = require('express');
const router  = express.Router();
const Report  = require('../models/Report');

// GET all non-resolved reports
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find({ status: { $ne: 'Resolved' } }).sort({ timestamp: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new report
router.post('/reports', async (req, res) => {
  const report = new Report({
    type:         req.body.type,
    severity:     req.body.severity,
    description:  req.body.description,
    location:     req.body.location,
    reporterName: req.body.reporterName,
  });

  try {
    const newReport = await report.save();
    const io = req.app.get('io');

    if (io) {
      io.emit('new_report', newReport);

      // Broadcast citizen alert if requested
      if (req.body.notifyArea) {
        io.emit('citizen_alert', {
          _id:          newReport._id,
          type:         newReport.type,
          severity:     newReport.severity,
          description:  newReport.description,
          location:     newReport.location,
          reporterName: newReport.reporterName,
          timestamp:    newReport.timestamp,
        });
      }
    }

    res.status(201).json(newReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH to update report status
router.patch('/reports/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    if (req.body.status) report.status = req.body.status;

    const updatedReport = await report.save();
    const io = req.app.get('io');
    if (io) io.emit('update_report', updatedReport);

    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
