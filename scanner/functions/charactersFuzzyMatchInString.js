function charactersFuzzyMatchInString(identifierString, lowercaseCharacters) {
            if (lowercaseCharacters.length === 0) {
                return true;
            }
            let matchedFirstCharacter = false;
            let prevChar;
            let characterIndex = 0;
            const len = identifierString.length;
            for (let strIndex = 0; strIndex < len; strIndex++) {
                const strChar = identifierString.charCodeAt(strIndex);
                const testChar = lowercaseCharacters.charCodeAt(characterIndex);
                if (strChar === testChar || strChar === toUpperCharCode(testChar)) {
                    matchedFirstCharacter || (matchedFirstCharacter = prevChar === void 0 || // Beginning of word
                        97 /* a */ <= prevChar && prevChar <= 122 /* z */ && 65 /* A */ <= strChar && strChar <= 90 /* Z */ || // camelCase transition
                        prevChar === 95 /* _ */ && strChar !== 95 /* _ */);
                    if (matchedFirstCharacter) {
                        characterIndex++;
                    }
                    if (characterIndex === lowercaseCharacters.length) {
                        return true;
                    }
                }
                prevChar = strChar;
            }
            return false;
        }