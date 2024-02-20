function getBodyRules(atRuleNode) {
                var nodeRules = atRuleNode.rules;
                if (hasFakeRuleset(atRuleNode)) {
                    return nodeRules[0].rules;
                }
                return nodeRules;
            }