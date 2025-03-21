require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const twilio = require('twilio');
const User = require('../models/User');

// Initialize Twilio Client
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

/**
 * Send SMS Verification Code
 * - Checks if the user exists in the database, creates a new user if not found.
 * - Sends a verification code via Twilio SMS.
 */
const sendSMSCode = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        // Check if the user exists, if not, create one
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            await User.create({ phoneNumber });
        }

        // Send verification code via Twilio
        const verification = await twilioClient.verify.v2.services(process.env.TWILIO_MESSAGING_SERVICE_SID)
            .verifications.create({ to: phoneNumber, channel: 'sms' });

        res.status(200).json({ message: 'Verification code sent', verification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Verify SMS Code
 * - Validates the received verification code.
 * - If verified, updates the user's status and generates a JWT token.
 */
const verifySMSCode = async (req, res) => {
    const { phoneNumber, code } = req.body;
    console.log({ phoneNumber, code });

    try {
        // Check verification code
        const verificationCheck = await twilioClient.verify.v2.services(process.env.TWILIO_MESSAGING_SERVICE_SID)
            .verificationChecks.create({ to: phoneNumber, code });

        if (verificationCheck.status === 'approved') {
            // Update user verification status
            const user = await User.findOneAndUpdate(
                { phoneNumber },
                { isVerified: true },
                { new: true }
            );

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2m' });

            res.status(200).json({ message: 'Phone number verified', token });
        } else {
            res.status(400).json({ message: 'Invalid or expired code' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Middleware: Authenticate JWT Token
 * - Extracts token from the authorization header.
 * - Verifies the token and grants access if valid.
 */
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token
    if (!token) return res.sendStatus(401); // Unauthorized if no token provided

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.user = user;
        res.json({ message: 'Access granted', user: req.user });
    });
};

// Export functions
module.exports = {
    sendSMSCode,
    verifySMSCode,
    authenticateToken
};

