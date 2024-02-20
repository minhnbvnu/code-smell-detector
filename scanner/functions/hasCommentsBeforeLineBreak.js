function hasCommentsBeforeLineBreak(text, start) {
            let i = start;
            while (i < text.length) {
                const ch = text.charCodeAt(i);
                if (isWhiteSpaceSingleLine(ch)) {
                    i++;
                    continue;
                }
                return ch === 47 /* slash */;
            }
            return false;
        }