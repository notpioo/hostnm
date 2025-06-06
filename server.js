const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set proper MIME types and headers for PWA
app.use((req, res, next) => {
    // Set proper MIME type for manifest.json
    if (req.url === '/manifest.json') {
        res.setHeader('Content-Type', 'application/manifest+json');
    }

    // Set proper MIME type for service worker
    if (req.url === '/sw.js') {
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Service-Worker-Allowed', '/');
    }

    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');

    next();
});

// Serve static files
app.use(express.static('.'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NoMercy Gaming Community running on port ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
});