function calculateIndent(text, pos, end) {
            let currentLineIndent = 0;
            for (; pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
                if (text.charCodeAt(pos) === 9 /* tab */) {
                    currentLineIndent += getIndentSize() - currentLineIndent % getIndentSize();
                }
                else {
                    currentLineIndent++;
                }
            }
            return currentLineIndent;
        }