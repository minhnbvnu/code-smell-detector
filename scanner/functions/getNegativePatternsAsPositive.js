function getNegativePatternsAsPositive(patterns, ignore) {
        const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
        const positive = negative.map(utils.pattern.convertToPositivePattern);
        return positive;
    }