function shouldMessageBeFixed(message, config, fixTypes) {
        if (!message.ruleId) {
            return fixTypes.has("directive");
        }
        const rule = message.ruleId && getRuleFromConfig(message.ruleId, config);
        return Boolean(rule && rule.meta && fixTypes.has(rule.meta.type));
    }