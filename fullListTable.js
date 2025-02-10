const getShruggEmojiTable = require('./emojiTable');
const getAsciiEmojiTable = require('./asciiTable');

function getFullListTable() {
    const shruggTable = getShruggEmojiTable();
    const asciiTable = getAsciiEmojiTable();
    return [...shruggTable, ...asciiTable];
}

module.exports = getFullListTable;
