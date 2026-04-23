const express = require('express');
const fs = require('fs').promises; 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths to your JSON files
const titlePath = path.join(__dirname, 'Title.json');
const commentPath = path.join(__dirname, 'comment.json');

// --- Endpoint 1: Random Title ---
app.get('/api/title', async (req, res) => {
    try {
        const data = await fs.readFile(titlePath, 'utf8');
        const titlesDb = JSON.parse(data);
        
        // Since Title.json is now a flat array, we just check its length
        if (!Array.isArray(titlesDb) || titlesDb.length === 0) {
            return res.status(404).json({ success: false, error: "No titles found in Title.json" });
        }

        const randomTitle = titlesDb[Math.floor(Math.random() * titlesDb.length)];

        res.json({
            success: true,
            data: randomTitle
        });

    } catch (error) {
        console.error("Error reading Title.json:", error);
        res.status(500).json({ success: false, error: "Internal Server Error or Malformed JSON" });
    }
});

// --- Endpoint 2: Random Comment ---
app.get('/api/comment', async (req, res) => {
    try {
        const data = await fs.readFile(commentPath, 'utf8');
        const commentsDb = JSON.parse(data);
        
        // comment.json is also a flat array
        if (!Array.isArray(commentsDb) || commentsDb.length === 0) {
            return res.status(404).json({ success: false, error: "No comments found in comment.json" });
        }

        const randomComment = commentsDb[Math.floor(Math.random() * commentsDb.length)];

        res.json({
            success: true,
            data: randomComment
        });

    } catch (error) {
        console.error("Error reading comment.json:", error);
        res.status(500).json({ success: false, error: "Internal Server Error or Malformed JSON" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
