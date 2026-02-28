const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const emailService = require('../services/email');

const configPath = path.join(__dirname, '../ui-config.json');

// Generic route handling for all actions defined in ui-config.json
router.post('/:actionKey', async (req, res) => {
    const { actionKey } = req.params;
    const payload = req.body;

    try {
        // Read configuration to validate allowed actions
        const data = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(data);

        // Security Validation: Check if the action exists in the configuration
        const actionConfig = config.buttons[actionKey];

        if (!actionConfig) {
            return res.status(404).json({ error: `Action '${actionKey}' is not supported by the system.` });
        }

        if (!actionConfig.enabled) {
            return res.status(403).json({ error: `Action '${actionKey}' is currently disabled in the configuration.` });
        }

        // --- Mapped Actions Execution Block ---
        console.log(`Executing Action: [${actionKey}] with payload:`, payload);

        // Here we branch to actual backend controllers based on the validated action
        let responseData = { success: true, message: actionConfig.successMessage };

        switch (actionKey) {
            case 'action_send_email':
                const emailResult = await emailService.sendOutboundEmail(payload.leadEmail, payload.subject, payload.body);
                if (!emailResult.success) throw new Error(emailResult.error);
                break;

            case 'action_generate_campaign':
                // This would normally call a local LLM or OpenAI
                responseData.data = { generated: "Generated variation..." };
                break;

            case 'action_schedule_email':
                // Save to DB
                break;

            case 'action_force_sync':
                // CRM API call
                break;

            default:
                console.log(`No specific backend logic for ${actionKey}, returning generic success.`);
        }

        // Return the success message configured in the UI config engine
        res.status(200).json(responseData);

    } catch (err) {
        console.error(`Action Failed [${actionKey}]:`, err);
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
});

module.exports = router;
