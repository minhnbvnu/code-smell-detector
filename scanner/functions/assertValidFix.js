function assertValidFix(fix) {
        if (fix) {
            assert(fix.range && typeof fix.range[0] === "number" && typeof fix.range[1] === "number", `Fix has invalid range: ${JSON.stringify(fix, null, 2)}`);
        }
    }