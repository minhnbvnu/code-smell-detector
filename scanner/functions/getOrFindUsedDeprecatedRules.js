function getOrFindUsedDeprecatedRules(eslint, maybeFilePath) {
        const { configs, options: { cwd } } = privateMembers.get(eslint);
        const filePath = path.isAbsolute(maybeFilePath)
            ? maybeFilePath
            : getPlaceholderPath(cwd);
        const config = configs.getConfig(filePath);
        // Most files use the same config, so cache it.
        if (config && !usedDeprecatedRulesCache.has(config)) {
            const retv = [];
            if (config.rules) {
                for (const [ruleId, ruleConf] of Object.entries(config.rules)) {
                    if (getRuleSeverity(ruleConf) === 0) {
                        continue;
                    }
                    const rule = getRuleFromConfig(ruleId, config);
                    const meta = rule && rule.meta;
                    if (meta && meta.deprecated) {
                        retv.push({ ruleId, replacedBy: meta.replacedBy || [] });
                    }
                }
            }
            usedDeprecatedRulesCache.set(config, Object.freeze(retv));
        }
        return config ? usedDeprecatedRulesCache.get(config) : Object.freeze([]);
    }