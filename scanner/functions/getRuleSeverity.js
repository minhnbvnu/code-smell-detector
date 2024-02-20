function getRuleSeverity(ruleConfig) {
        const severityValue = Array.isArray(ruleConfig) ? ruleConfig[0] : ruleConfig;
        if (severityValue === 0 || severityValue === 1 || severityValue === 2) {
            return severityValue;
        }
        if (typeof severityValue === "string") {
            return RULE_SEVERITY[severityValue.toLowerCase()] || 0;
        }
        return 0;
    }