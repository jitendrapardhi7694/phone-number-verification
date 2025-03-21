const express = require('express');
const router = express.Router();
const {
    sendSMSCode, 
    verifySMSCode, 
    authenticateToken
} = require('../controllers/shcTechSmsController');

// Route to send verification SMS
router.post('/send-code', sendSMSCode);

// Route to verify SMS code
router.post('/verify-code', verifySMSCode);

// Route to authenticate user using JWT
router.post('/authentication', authenticateToken);

module.exports = router;
