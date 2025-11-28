const express = require('express');
const router = express.Router();
const { coachHandler } = require('../services/coachService');

router.post('/coach', async (req, res) => {
  try {
    const { sessionContext, message } = req.body;
    if (!message) return res.status(400).json({ ok: false, error: 'message requis' });

    const response = await coachHandler({ sessionContext: sessionContext || null, message });
    res.json({ ok: true, data: response });
  } catch (err) {
    console.error('Error /coach', err);
    res.status(500).json({ ok: false, error: err.message || 'Erreur serveur' });
  }
});

module.exports = router;