const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const urlMap = new Map(); // This map will store the mapping between short codes and long URLs

// Route to handle redirection from shortened URL
app.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;
    const longURL = urlMap.get(shortCode);
    if (longURL) {
        res.redirect(longURL);
    } else {
        res.status(404).send('URL not found');
    }
});

// Route to handle URL shortening
app.post('/shorten', express.json(), (req, res) => {
    const { longURL } = req.body;
    if (longURL) {
        const shortCode = generateShortCode(longURL);
        const shortenedURL = `http://localhost:3000/${shortCode}`; // Using localhost address
        urlMap.set(shortCode, longURL);
        res.json({ shortenedURL });
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function generateShortCode(longURL) {
    // This is a simplified example of generating a short code.
    // In a real application, you would use a more robust algorithm.
    return longURL.hashCode().toString(36).slice(0, 6);
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
