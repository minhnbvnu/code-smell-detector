function maybeGetESLintCoreRule(ruleId) {
        try {
            return (0, exports.getESLintCoreRule)(ruleId);
        }
        catch (_a) {
            return null;
        }
    }