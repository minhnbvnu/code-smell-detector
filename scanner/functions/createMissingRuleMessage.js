function createMissingRuleMessage(ruleId) {
        return Object.prototype.hasOwnProperty.call(ruleReplacements.rules, ruleId)
            ? `Rule '${ruleId}' was removed and replaced by: ${ruleReplacements.rules[ruleId].join(", ")}`
            : `Definition for rule '${ruleId}' was not found.`;
    }