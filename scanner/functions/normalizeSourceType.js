function normalizeSourceType(sourceType = "script") {
        if (sourceType === "script" || sourceType === "module") {
            return sourceType;
        }
        if (sourceType === "commonjs") {
            return "script";
        }
        throw new Error("Invalid sourceType.");
    }