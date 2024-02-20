function normalizePatterns(patterns) {
        if (Array.isArray(patterns)) {
            return patterns.filter(Boolean);
        }
        if (typeof patterns === "string" && patterns) {
            return [patterns];
        }
        return [];
    }