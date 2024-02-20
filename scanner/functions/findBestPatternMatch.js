function findBestPatternMatch(values, getPattern, candidate) {
            let matchedValue;
            let longestMatchPrefixLength = -1;
            for (const v of values) {
                const pattern = getPattern(v);
                if (isPatternMatch(pattern, candidate) && pattern.prefix.length > longestMatchPrefixLength) {
                    longestMatchPrefixLength = pattern.prefix.length;
                    matchedValue = v;
                }
            }
            return matchedValue;
        }