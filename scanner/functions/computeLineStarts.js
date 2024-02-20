function computeLineStarts(text) {
            const result = [];
            let pos = 0;
            let lineStart = 0;
            while (pos < text.length) {
                const ch = text.charCodeAt(pos);
                pos++;
                switch (ch) {
                    case 13 /* carriageReturn */:
                        if (text.charCodeAt(pos) === 10 /* lineFeed */) {
                            pos++;
                        }
                    case 10 /* lineFeed */:
                        result.push(lineStart);
                        lineStart = pos;
                        break;
                    default:
                        if (ch > 127 /* maxAsciiCharacter */ && isLineBreak(ch)) {
                            result.push(lineStart);
                            lineStart = pos;
                        }
                        break;
                }
            }
            result.push(lineStart);
            return result;
        }