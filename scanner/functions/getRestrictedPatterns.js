function getRestrictedPatterns(options) {
        if (isObjectOfPatterns(options[0])) {
            return options[0].patterns;
        }
        return [];
    }