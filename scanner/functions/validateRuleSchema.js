function validateRuleSchema(rule, localOptions) {
        if (!ruleValidators.has(rule)) {
            const schema = getRuleOptionsSchema(rule);
            if (schema) {
                ruleValidators.set(rule, ajv.compile(schema));
            }
        }
        const validateRule = ruleValidators.get(rule);
        if (validateRule) {
            validateRule(localOptions);
            if (validateRule.errors) {
                throw new Error(validateRule.errors.map(error => `\tValue ${JSON.stringify(error.data)} ${error.message}.\n`).join(""));
            }
        }
    }