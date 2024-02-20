function partStartsWith(candidate, candidateSpan, pattern, ignoreCase, patternSpan = { start: 0, length: pattern.length }) {
            return patternSpan.length <= candidateSpan.length && everyInRange(0, patternSpan.length, (i) => equalChars(pattern.charCodeAt(patternSpan.start + i), candidate.charCodeAt(candidateSpan.start + i), ignoreCase));
        }