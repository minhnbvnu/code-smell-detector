function assertIsRuleOptions(value) {
        if (typeof value !== "string" && typeof value !== "number" && !Array.isArray(value)) {
            throw new TypeError("Expected a string, number, or array.");
        }
    }