const express = require('express');
const bodyParser = require('body-parser');
const getShruggEmojiTable = require('./emojiTable');
const getAsciiEmojiTable = require('./asciiTable');
const getFullListTable = require('./fullListTable');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/emoji', (req, res) => {
    const { emoji } = req.body;
    if (emoji) {
        res.status(200).send(`Received emoji: ${emoji}`);
    } else {
        res.status(400).send('No emoji provided');
    }
});

app.get('/shrugg', (req, res) => {
    const table = getShruggEmojiTable();
    res.status(200).json(table);
});

app.get('/ascii', (req, res) => {
    const table = getAsciiEmojiTable();
    res.status(200).json(table);
});

app.get('/fulllist', (req, res) => {
    const table = getFullListTable();
    res.status(200).json(table);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
