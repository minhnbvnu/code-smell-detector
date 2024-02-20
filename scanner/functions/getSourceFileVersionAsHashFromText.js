function getSourceFileVersionAsHashFromText(host, text) {
            if (text.match(sourceMapCommentRegExpDontCareLineStart)) {
                let lineEnd = text.length;
                let lineStart = lineEnd;
                for (let pos = lineEnd - 1; pos >= 0; pos--) {
                    const ch = text.charCodeAt(pos);
                    switch (ch) {
                        case 10 /* lineFeed */:
                            if (pos && text.charCodeAt(pos - 1) === 13 /* carriageReturn */) {
                                pos--;
                            }
                        case 13 /* carriageReturn */:
                            break;
                        default:
                            if (ch < 127 /* maxAsciiCharacter */ || !isLineBreak(ch)) {
                                lineStart = pos;
                                continue;
                            }
                            break;
                    }
                    const line = text.substring(lineStart, lineEnd);
                    if (line.match(sourceMapCommentRegExp)) {
                        text = text.substring(0, lineStart);
                        break;
                    }
                    else if (!line.match(whitespaceOrMapCommentRegExp)) {
                        break;
                    }
                    lineEnd = lineStart;
                }
            }
            return (host.createHash || generateDjb2Hash)(text);
        }