function throwRuleNotFoundError({ pluginName, ruleName }, config) {
        const ruleId = pluginName === "@" ? ruleName : `${pluginName}/${ruleName}`;
        const errorMessageHeader = `Key "rules": Key "${ruleId}"`;
        let errorMessage = `${errorMessageHeader}: Could not find plugin "${pluginName}".`;
        // if the plugin exists then we need to check if the rule exists
        if (config.plugins && config.plugins[pluginName]) {
            const replacementRuleName = ruleReplacements.rules[ruleName];
            if (pluginName === "@" && replacementRuleName) {
                errorMessage = `${errorMessageHeader}: Rule "${ruleName}" was removed and replaced by "${replacementRuleName}".`;
            }
            else {
                errorMessage = `${errorMessageHeader}: Could not find "${ruleName}" in plugin "${pluginName}".`;
                // otherwise, let's see if we can find the rule name elsewhere
                for (const [otherPluginName, otherPlugin] of Object.entries(config.plugins)) {
                    if (otherPlugin.rules && otherPlugin.rules[ruleName]) {
                        errorMessage += ` Did you mean "${otherPluginName}/${ruleName}"?`;
                        break;
                    }
                }
            }
            // falls through to throw error
        }
        throw new TypeError(errorMessage);
    }