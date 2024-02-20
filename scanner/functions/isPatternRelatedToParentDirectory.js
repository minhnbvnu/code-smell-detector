function isPatternRelatedToParentDirectory(pattern) {
        return pattern.startsWith('..') || pattern.startsWith('./..');
    }