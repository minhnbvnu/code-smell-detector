function createRulesMeta(rules) {
        return Array.from(rules).reduce((retVal, [id, rule]) => {
            retVal[id] = rule.meta;
            return retVal;
        }, {});
    }