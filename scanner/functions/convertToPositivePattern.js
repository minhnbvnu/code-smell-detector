function convertToPositivePattern(pattern) {
        return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
    }