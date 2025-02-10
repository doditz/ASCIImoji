const express = require("express");
const axios = require("axios");
const vm = require("vm"); // Secure execution environment

const app = express();
app.use(express.json());

const repoOwner = "doditz";
const repoName = "ASCIImoji";
const filePath = "asciimoji.js";
const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

let asciimojiProcessor;

// Function to load ASCIImoji dynamically from GitHub
async function loadAsciiMoji() {
    try {
        console.log(`Fetching ASCIImoji from: ${githubApiUrl}`); // Log the URL
        const response = await axios.get(githubApiUrl);
        const base64Content = response.data.content;
        const scriptContent = Buffer.from(base64Content, "base64").toString("utf-8");

        // Create a secure JavaScript execution context
        const context = { module: {}, exports: {} };
        vm.runInNewContext(scriptContent, context);

        asciimojiProcessor = context.module.exports || context.exports;
        console.log("✅ ASCIImoji loaded successfully!");
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("❌ ASCIImoji file not found (404):", error.response.data);
        } else {
            console.error("❌ Failed to load ASCIImoji:", error);
        }
    }
}

// API Route to Convert Text to ASCII Emoji
app.post("/convert", (req, res) => {
    if (!asciimojiProcessor) return res.status(500).json({ error: "ASCIImoji not loaded" });

    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    try {
        const result = asciimojiProcessor(text);
        res.json({ result });
    } catch (error) {
        res.status(500).json({ error: "Processing error", details: error.message });
    }
});

// Start Server & Load ASCIImoji
app.listen(3000, async () => {
    console.log("🚀 Server running on http://localhost:3000");
    await loadAsciiMoji();
});
