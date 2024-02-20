function isValidSeverity(ruleConfig) {
        let severity = Array.isArray(ruleConfig) ? ruleConfig[0] : ruleConfig;
        if (typeof severity === "string") {
            severity = severity.toLowerCase();
        }
        return VALID_SEVERITIES.indexOf(severity) !== -1;
    }