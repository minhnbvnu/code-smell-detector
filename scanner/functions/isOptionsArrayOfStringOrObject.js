function isOptionsArrayOfStringOrObject(options) {
        if (isObjectOfPaths(options[0])) {
            return false;
        }
        if (isObjectOfPatterns(options[0])) {
            return false;
        }
        return true;
    }