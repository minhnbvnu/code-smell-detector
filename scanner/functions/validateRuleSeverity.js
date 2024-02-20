function validateRuleSeverity(options) {
        const severity = Array.isArray(options) ? options[0] : options;
        const normSeverity = typeof severity === "string" ? severityMap[severity.toLowerCase()] : severity;
        if (normSeverity === 0 || normSeverity === 1 || normSeverity === 2) {
            return normSeverity;
        }
        throw new Error(`\tSeverity should be one of the following: 0 = off, 1 = warn, 2 = error (you passed '${util.inspect(severity).replace(/'/gu, "\"").replace(/\n/gu, "")}').\n`);
    }