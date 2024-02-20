function matchTextChunk(candidate, chunk, stringToWordSpans) {
            const index = indexOfIgnoringCase(candidate, chunk.textLowerCase);
            if (index === 0) {
                return createPatternMatch(chunk.text.length === candidate.length ? 0 /* exact */ : 1 /* prefix */, 
                /*isCaseSensitive:*/
                startsWith(candidate, chunk.text));
            }
            if (chunk.isLowerCase) {
                if (index === -1)
                    return void 0;
                const wordSpans = getWordSpans(candidate, stringToWordSpans);
                for (const span of wordSpans) {
                    if (partStartsWith(candidate, span, chunk.text, 
                    /*ignoreCase:*/
                    true)) {
                        return createPatternMatch(2 /* substring */, 
                        /*isCaseSensitive:*/
                        partStartsWith(candidate, span, chunk.text, 
                        /*ignoreCase:*/
                        false));
                    }
                }
                if (chunk.text.length < candidate.length && isUpperCaseLetter(candidate.charCodeAt(index))) {
                    return createPatternMatch(2 /* substring */, 
                    /*isCaseSensitive:*/
                    false);
                }
            }
            else {
                if (candidate.indexOf(chunk.text) > 0) {
                    return createPatternMatch(2 /* substring */, 
                    /*isCaseSensitive:*/
                    true);
                }
                if (chunk.characterSpans.length > 0) {
                    const candidateParts = getWordSpans(candidate, stringToWordSpans);
                    const isCaseSensitive = tryCamelCaseMatch(candidate, candidateParts, chunk, 
                    /*ignoreCase:*/
                    false) ? true : tryCamelCaseMatch(candidate, candidateParts, chunk, 
                    /*ignoreCase:*/
                    true) ? false : void 0;
                    if (isCaseSensitive !== void 0) {
                        return createPatternMatch(3 /* camelCase */, isCaseSensitive);
                    }
                }
            }
        }