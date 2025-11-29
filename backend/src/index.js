const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

const generateRoutes = require('./routes/generate')
const coachRoutes = require('./routes/coach')
const paymentsRoutes = require('./routes/payments')

app.use('/api', generateRoutes)
app.use('/api', coachRoutes)
app.use('/api', paymentsRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Backend cvintelligent running on http://localhost:${PORT}`)
})
