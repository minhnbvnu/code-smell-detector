function indexOfAnyCharCode(text, charCodes, start) {
            for (let i = start || 0; i < text.length; i++) {
                if (contains(charCodes, text.charCodeAt(i))) {
                    return i;
                }
            }
            return -1;
        }