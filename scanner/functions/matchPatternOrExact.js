function matchPatternOrExact(patternOrStrings, candidate) {
            const patterns = [];
            for (const patternOrString of patternOrStrings) {
                if (patternOrString === candidate) {
                    return candidate;
                }
                if (!isString(patternOrString)) {
                    patterns.push(patternOrString);
                }
            }
            return findBestPatternMatch(patterns, (_) => _, candidate);
        }