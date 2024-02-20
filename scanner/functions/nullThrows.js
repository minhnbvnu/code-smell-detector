function nullThrows(value, message) {
        // this function is primarily used to keep types happy in a safe way
        // i.e. is used when we expect that a value is never nullish
        // this means that it's pretty much impossible to test the below if...
        // so ignore it in coverage metrics.
        /* istanbul ignore if */
        if (value == null) {
            throw new Error(`Non-null Assertion Failed: ${message}`);
        }
        return value;
    }