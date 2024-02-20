function assertIsObject(value) {
        if (!isNonNullObject(value)) {
            throw new TypeError("Expected an object.");
        }
    }