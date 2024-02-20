function assertIsArray(value) {
        if (!Array.isArray(value)) {
            throw new TypeError('Expected value to be an array.');
        }
    }