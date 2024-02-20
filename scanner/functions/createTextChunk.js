function createTextChunk(text) {
            const textLowerCase = text.toLowerCase();
            return {
                text,
                textLowerCase,
                isLowerCase: text === textLowerCase,
                characterSpans: breakIntoCharacterSpans(text)
            };
        }