function isStaticPattern(pattern, options = {}) {
        return !isDynamicPattern(pattern, options);
    }