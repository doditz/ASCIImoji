const express = require('express');
const config = require('./config');
const githubApi = require('./githubApi');

const app = express();

app.get('/user/:username', async (req, res) => {
    try {
        const userData = await githubApi.getUserData(req.params.username);
        res.json(userData);
    } catch (error) {
        res.status(500).send('Error fetching user data');
    }
});

app.listen(3000, () => {
    console.log(`Server running at ${config.codespaceUrl}`);
});
