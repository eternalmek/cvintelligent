const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const pdfParse = require('pdf-parse')

const { generateCVHandler } = require('../services/generateService')

const uploadDir = path.join(__dirname, '..', '..', 'uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

router.post('/generate-cv', upload.single('resume'), async (req, res) => {
  try {
    const { name, targetRole, experiences, jobPosting } = req.body
    let resumeText = null

    if (req.file) {
      const dataBuffer = fs.readFileSync(req.file.path)
      const pdfData = await pdfParse(dataBuffer)
      resumeText = pdfData?.text || null
    }

    const input = {
      name: name || '',
      targetRole: targetRole || '',
      experiences: experiences || '',
      jobPosting: jobPosting || '',
      resumeText
    }

    const result = await generateCVHandler(input)

    res.json({ ok: true, data: result })
  } catch (err) {
    console.error('Error /generate-cv', err)
    res.status(500).json({ ok: false, error: err.message || 'Erreur serveur' })
  }
})

module.exports = router
