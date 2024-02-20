function createRulesMap(rules) {
            const map2 = buildMap(rules);
            return (context) => {
                const bucket = map2[getRuleBucketIndex(context.currentTokenSpan.kind, context.nextTokenSpan.kind)];
                if (bucket) {
                    const rules2 = [];
                    let ruleActionMask = 0;
                    for (const rule2 of bucket) {
                        const acceptRuleActions = ~getRuleActionExclusion(ruleActionMask);
                        if (rule2.action & acceptRuleActions && every(rule2.context, (c) => c(context))) {
                            rules2.push(rule2);
                            ruleActionMask |= rule2.action;
                        }
                    }
                    if (rules2.length) {
                        return rules2;
                    }
                }
            };
        }