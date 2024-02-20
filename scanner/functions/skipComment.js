function skipComment() {
        var ch;

        while (index < length) {
            ch = source.charCodeAt(index);

            if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch === 13 && source.charCodeAt(index) === 10) {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
            } else if (ch === 47) { // 47 is '/'
                ch = source.charCodeAt(index + 1);
                if (ch === 47) {
                    ++index;
                    ++index;
                    skipSingleLineComment();
                } else if (ch === 42) {  // 42 is '*'
                    ++index;
                    ++index;
                    skipMultiLineComment();
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }