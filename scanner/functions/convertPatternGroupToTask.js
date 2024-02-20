function convertPatternGroupToTask(base, positive, negative, dynamic) {
        return {
            dynamic,
            positive,
            negative,
            base,
            patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
        };
    }