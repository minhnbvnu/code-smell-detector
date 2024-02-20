function matchedText(pattern, candidate) {
            Debug.assert(isPatternMatch(pattern, candidate));
            return candidate.substring(pattern.prefix.length, candidate.length - pattern.suffix.length);
        }