function isFixTypeArray(x) {
        return Array.isArray(x) && x.every(isFixType);
    }