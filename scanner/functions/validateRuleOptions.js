function validateRuleOptions(rule, ruleId, options, source = null) {
        try {
            const severity = validateRuleSeverity(options);
            if (severity !== 0) {
                validateRuleSchema(rule, Array.isArray(options) ? options.slice(1) : []);
            }
        }
        catch (err) {
            const enhancedMessage = `Configuration for rule "${ruleId}" is invalid:\n${err.message}`;
            if (typeof source === "string") {
                throw new Error(`${source}:\n\t${enhancedMessage}`);
            }
            else {
                throw new Error(enhancedMessage);
            }
        }
    }