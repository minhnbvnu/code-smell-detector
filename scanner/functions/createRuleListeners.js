function createRuleListeners(rule, ruleContext) {
        try {
            return rule.create(ruleContext);
        }
        catch (ex) {
            ex.message = `Error while loading rule '${ruleContext.id}': ${ex.message}`;
            throw ex;
        }
    }