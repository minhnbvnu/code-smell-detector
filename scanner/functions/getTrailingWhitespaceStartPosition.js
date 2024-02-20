function getTrailingWhitespaceStartPosition(start, end) {
                let pos = end;
                while (pos >= start && isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(pos))) {
                    pos--;
                }
                if (pos !== end) {
                    return pos + 1;
                }
                return -1;
            }