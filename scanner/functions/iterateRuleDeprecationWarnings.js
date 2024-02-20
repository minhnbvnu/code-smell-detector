function* iterateRuleDeprecationWarnings(configs) {
        const processedRuleIds = new Set();
        for (const config of configs) {
            for (const [ruleId, ruleConfig] of Object.entries(config.rules)) {
                // Skip if it was processed.
                if (processedRuleIds.has(ruleId)) {
                    continue;
                }
                processedRuleIds.add(ruleId);
                // Skip if it's not used.
                if (!getRuleSeverity(ruleConfig)) {
                    continue;
                }
                const rule = getRuleFromConfig(ruleId, config);
                // Skip if it's not deprecated.
                if (!(rule && rule.meta && rule.meta.deprecated)) {
                    continue;
                }
                // This rule was used and deprecated.
                yield {
                    ruleId,
                    replacedBy: rule.meta.replacedBy || []
                };
            }
        }
    }