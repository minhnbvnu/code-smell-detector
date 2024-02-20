function breakPatternIntoTextChunks(pattern) {
            const result = [];
            let wordStart = 0;
            let wordLength = 0;
            for (let i = 0; i < pattern.length; i++) {
                const ch = pattern.charCodeAt(i);
                if (isWordChar(ch)) {
                    if (wordLength === 0) {
                        wordStart = i;
                    }
                    wordLength++;
                }
                else {
                    if (wordLength > 0) {
                        result.push(createTextChunk(pattern.substr(wordStart, wordLength)));
                        wordLength = 0;
                    }
                }
            }
            if (wordLength > 0) {
                result.push(createTextChunk(pattern.substr(wordStart, wordLength)));
            }
            return result;
        }