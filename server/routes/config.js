const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../ui-config.json');

// Get the current UI configuration
router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Error reading config:', err);
        res.status(500).json({ error: 'Failed to read UI configuration.' });
    }
});

// Update the UI configuration (Saving from the Admin screens)
router.post('/', (req, res) => {
    try {
        const newConfig = req.body;

        // Basic validation
        if (!newConfig.buttons || !newConfig.features) {
            return res.status(400).json({ error: 'Invalid config format.' });
        }

        fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
        res.json({ success: true, message: 'Configuration saved successfully.' });
    } catch (err) {
        console.error('Error saving config:', err);
        res.status(500).json({ error: 'Failed to write UI configuration.' });
    }
});

module.exports = router;
