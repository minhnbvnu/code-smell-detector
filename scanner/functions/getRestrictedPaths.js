function getRestrictedPaths(options) {
        if (isOptionsArrayOfStringOrObject(options)) {
            return options;
        }
        if (isObjectOfPaths(options[0])) {
            return options[0].paths;
        }
        return [];
    }