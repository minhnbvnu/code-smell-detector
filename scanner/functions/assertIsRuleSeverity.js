function assertIsRuleSeverity(value) {
        const severity = typeof value === "string"
            ? ruleSeverities.get(value.toLowerCase())
            : ruleSeverities.get(value);
        if (typeof severity === "undefined") {
            throw new TypeError("Expected severity of \"off\", 0, \"warn\", 1, \"error\", or 2.");
        }
    }