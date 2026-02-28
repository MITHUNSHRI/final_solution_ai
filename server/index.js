const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const configRoutes = require('./routes/config');
const actionRoutes = require('./routes/actions');
const leadsRoutes = require('./routes/leads');

require('dotenv').config();

// Initialize database on startup
require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Main Configuration API
app.use('/api/config', configRoutes);

// Generic Action Resolver
app.use('/api/actions', actionRoutes);

// Customer / Leads Database CRUD API
app.use('/api/customers', leadsRoutes);

app.listen(PORT, () => {
    console.log(`Backend Server running on port ${PORT}`);
});
