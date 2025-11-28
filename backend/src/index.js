const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Static uploads (PDFs)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
const generateRoutes = require('./routes/generate');
const coachRoutes = require('./routes/coach');

app.use('/api', generateRoutes);
app.use('/api', coachRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend cvintelligent running on http://localhost:${PORT}`);
});