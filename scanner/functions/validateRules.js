function validateRules(rulesConfig, source, getAdditionalRule = noop) {
        if (!rulesConfig) {
            return;
        }
        Object.keys(rulesConfig).forEach(id => {
            const rule = getAdditionalRule(id) || BuiltInRules.get(id) || null;
            validateRuleOptions(rule, id, rulesConfig[id], source);
        });
    }