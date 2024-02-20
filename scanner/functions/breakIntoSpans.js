function breakIntoSpans(identifier, word) {
            const result = [];
            let wordStart = 0;
            for (let i = 1; i < identifier.length; i++) {
                const lastIsDigit = isDigit2(identifier.charCodeAt(i - 1));
                const currentIsDigit = isDigit2(identifier.charCodeAt(i));
                const hasTransitionFromLowerToUpper = transitionFromLowerToUpper(identifier, word, i);
                const hasTransitionFromUpperToLower = word && transitionFromUpperToLower(identifier, i, wordStart);
                if (charIsPunctuation(identifier.charCodeAt(i - 1)) || charIsPunctuation(identifier.charCodeAt(i)) || lastIsDigit !== currentIsDigit || hasTransitionFromLowerToUpper || hasTransitionFromUpperToLower) {
                    if (!isAllPunctuation(identifier, wordStart, i)) {
                        result.push(createTextSpan(wordStart, i - wordStart));
                    }
                    wordStart = i;
                }
            }
            if (!isAllPunctuation(identifier, wordStart, identifier.length)) {
                result.push(createTextSpan(wordStart, identifier.length - wordStart));
            }
            return result;
        }