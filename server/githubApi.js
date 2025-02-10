const axios = require('axios');
const config = require('./config');

const githubApi = axios.create({
    baseURL: config.githubApiUrl,
    headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    }
});

async function getUserData(username) {
    try {
        const response = await githubApi.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user data: ${error}`);
        throw error;
    }
}

module.exports = {
    getUserData,
};
