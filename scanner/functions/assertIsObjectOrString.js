function assertIsObjectOrString(value) {
        if ((!value || typeof value !== "object") && typeof value !== "string") {
            throw new TypeError("Expected an object or string.");
        }
    }