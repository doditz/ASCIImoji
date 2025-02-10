
function getShruggEmojiTable() {
    const shruggMethods = [
        { method: 'text', emoji: '¯\\_(ツ)_/¯' },
        { method: 'unicode', emoji: '\u00AF\\_(\u30C4)_/\u00AF' },
        { method: 'html', emoji: '&macr;\\_(ツ)_/&macr;' },
        // Add more methods if needed
    ];

    return shruggMethods;
}

module.exports = getShruggEmojiTable;
