function addRule(rules, rule2, specificTokens, constructionState, rulesBucketIndex) {
            const position = rule2.action & 3 /* StopAction */ ? specificTokens ? 0 /* StopRulesSpecific */ : RulesPosition.StopRulesAny : rule2.context !== anyContext ? specificTokens ? RulesPosition.ContextRulesSpecific : RulesPosition.ContextRulesAny : specificTokens ? RulesPosition.NoContextRulesSpecific : RulesPosition.NoContextRulesAny;
            const state = constructionState[rulesBucketIndex] || 0;
            rules.splice(getInsertionIndex(state, position), 0, rule2);
            constructionState[rulesBucketIndex] = increaseInsertionIndex(state, position);
        }