function emitLegacyRuleAPIWarning(ruleName) {
        if (!emitLegacyRuleAPIWarning[`warned-${ruleName}`]) {
            emitLegacyRuleAPIWarning[`warned-${ruleName}`] = true;
            process.emitWarning(`"${ruleName}" rule is using the deprecated function-style format and will stop working in ESLint v9. Please use object-style format: https://eslint.org/docs/latest/extend/custom-rules`, "DeprecationWarning");
        }
    }