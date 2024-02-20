function getRuleOptions(ruleConfig) {
        if (Array.isArray(ruleConfig)) {
            return ruleConfig.slice(1);
        }
        return [];
    }