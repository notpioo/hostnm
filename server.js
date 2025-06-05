const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable for PWA compatibility
}));

// Compression middleware
app.use(compression());

// Static files
app.use(express.static(path.join(__dirname), {
    maxAge: '1d',
    etag: false
}));

// PWA specific headers
app.use((req, res, next) => {
    // Service Worker
    if (req.url === '/sw.js') {
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Service-Worker-Allowed', '/');
    }
    
    // Manifest
    if (req.url === '/manifest.json') {
        res.setHeader('Content-Type', 'application/manifest+json');
    }
    
    next();
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`🚀 NoMercy Gaming Community running on port ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
});