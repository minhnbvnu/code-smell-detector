function parseRuleId(ruleId) {
        let pluginName, ruleName;
        // distinguish between core rules and plugin rules
        if (ruleId.includes("/")) {
            // mimic scoped npm packages
            if (ruleId.startsWith("@")) {
                pluginName = ruleId.slice(0, ruleId.lastIndexOf("/"));
            }
            else {
                pluginName = ruleId.slice(0, ruleId.indexOf("/"));
            }
            ruleName = ruleId.slice(pluginName.length + 1);
        }
        else {
            pluginName = "@";
            ruleName = ruleId;
        }
        return {
            pluginName,
            ruleName
        };
    }