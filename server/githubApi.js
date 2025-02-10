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

async function getRepoData(owner, repo) {
    try {
        const response = await githubApi.get(`/repos/${owner}/${repo}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching repository data: ${error}`);
        throw error;
    }
}
