function validateBoolean(value, fallback = false) {
        if (typeof value !== 'boolean') {
            return fallback;
        }
        return value;
    }