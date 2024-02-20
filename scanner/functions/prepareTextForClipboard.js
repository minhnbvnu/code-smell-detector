function prepareTextForClipboard(text) {
    var space = String.fromCharCode(32), nonBreakingSpace = String.fromCharCode(160), allNonBreakingSpaces = new RegExp(nonBreakingSpace, 'g'), processedText = text.split('\n').map(function (line) {
        var processedLine = line.replace(/\s+$/g, '').replace(allNonBreakingSpaces, space);
        return processedLine;
    }).join('\n');
    return processedText;
}