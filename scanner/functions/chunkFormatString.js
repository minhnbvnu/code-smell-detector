function chunkFormatString(formatStr) {
    var chunks = [];
    var match;
    // TODO: more descrimination
    // \4 is a backreference to the first character of a multi-character set.
    var chunker = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g;
    while ((match = chunker.exec(formatStr))) {
        if (match[1]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[1]));
        }
        else if (match[2]) {
            chunks.push({ maybe: chunkFormatString(match[2]) });
        }
        else if (match[3]) {
            chunks.push({ token: match[3] });
        }
        else if (match[5]) {
            chunks.push.apply(chunks, // append
            splitStringLiteral(match[5]));
        }
    }
    return chunks;
}