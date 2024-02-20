function createLintingProblem(options) {
        const { ruleId = null, loc = DEFAULT_ERROR_LOC, message = createMissingRuleMessage(options.ruleId), severity = 2 } = options;
        return {
            ruleId,
            message,
            line: loc.start.line,
            column: loc.start.column + 1,
            endLine: loc.end.line,
            endColumn: loc.end.column + 1,
            severity,
            nodeType: null
        };
    }