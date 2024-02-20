function trimSpaces(text) {
            if (typeof (text) !== 'string') {
                return text;
            }
            var TEXT = text.trim();
            if (TEXT.match(/\\$/) && text.match(/ $/)) {
                TEXT += ' ';
            }
            return TEXT;
        }