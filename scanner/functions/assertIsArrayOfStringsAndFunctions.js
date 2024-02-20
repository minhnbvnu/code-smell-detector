function assertIsArrayOfStringsAndFunctions(value, name) {
        assertIsArray(value);
        if (value.some(item => typeof item !== 'string' && typeof item !== 'function')) {
            throw new TypeError('Expected array to only contain strings.');
        }
    }