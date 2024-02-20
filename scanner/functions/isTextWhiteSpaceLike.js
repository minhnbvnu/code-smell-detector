function isTextWhiteSpaceLike(text, startPos, endPos) {
            for (let i = startPos; i < endPos; i++) {
                if (!isWhiteSpaceLike(text.charCodeAt(i))) {
                    return false;
                }
            }
            return true;
        }