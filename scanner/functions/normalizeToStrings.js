function normalizeToStrings(config) {
        if (config.rules) {
            Object.keys(config.rules).forEach(ruleId => {
                const ruleConfig = config.rules[ruleId];
                if (typeof ruleConfig === "number") {
                    config.rules[ruleId] = RULE_SEVERITY_STRINGS[ruleConfig] || RULE_SEVERITY_STRINGS[0];
                }
                else if (Array.isArray(ruleConfig) && typeof ruleConfig[0] === "number") {
                    ruleConfig[0] = RULE_SEVERITY_STRINGS[ruleConfig[0]] || RULE_SEVERITY_STRINGS[0];
                }
            });
        }
    }