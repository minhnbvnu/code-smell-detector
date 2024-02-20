function hasFakeRuleset(atRuleNode) {
                var bodyRules = atRuleNode.rules;
                return bodyRules.length === 1 && (!bodyRules[0].paths || bodyRules[0].paths.length === 0);
            }