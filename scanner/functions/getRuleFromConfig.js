function getRuleFromConfig(ruleId, config) {
        const { pluginName, ruleName } = parseRuleId(ruleId);
        const plugin = config.plugins && config.plugins[pluginName];
        let rule = plugin && plugin.rules && plugin.rules[ruleName];
        // normalize function rules into objects
        if (rule && typeof rule === "function") {
            rule = {
                create: rule
            };
        }
        return rule;
    }