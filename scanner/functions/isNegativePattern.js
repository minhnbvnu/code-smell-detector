function isNegativePattern(pattern) {
        return pattern.startsWith('!') && pattern[1] !== '(';
    }