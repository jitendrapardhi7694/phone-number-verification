require('dotenv').config(); // Load environment variables

const express = require('express');
const app = express();
const cors = require('cors');
const masterRoutes = require('./routes/masterRoute');

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Replaces body-parser
app.use(cors()); 

// Routes
app.use('/api', masterRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});
