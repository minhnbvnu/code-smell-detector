function isArrayOfNonEmptyString(x) {
        return Array.isArray(x) && x.every(isNonEmptyString);
    }