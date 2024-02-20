function getPatternsInsideCurrentDirectory(patterns) {
        return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
    }