function normalizeRuleOptions(ruleOptions) {
        const finalOptions = Array.isArray(ruleOptions)
            ? ruleOptions.slice(0)
            : [ruleOptions];
        finalOptions[0] = ruleSeverities.get(finalOptions[0]);
        return finalOptions;
    }