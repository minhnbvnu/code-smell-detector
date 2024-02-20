function getPatternsOutsideCurrentDirectory(patterns) {
        return patterns.filter(isPatternRelatedToParentDirectory);
    }