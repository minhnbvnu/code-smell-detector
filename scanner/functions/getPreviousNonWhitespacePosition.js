function getPreviousNonWhitespacePosition(pos, stopPos = 0, sourceFile) {
            while (pos-- > stopPos) {
                if (!isWhiteSpaceLike(sourceFile.text.charCodeAt(pos))) {
                    return pos;
                }
            }
        }