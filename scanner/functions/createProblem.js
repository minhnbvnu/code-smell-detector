function createProblem(options) {
        const problem = {
            ruleId: options.ruleId,
            severity: options.severity,
            message: options.message,
            line: options.loc.start.line,
            column: options.loc.start.column + 1,
            nodeType: options.node && options.node.type || null
        };
        /*
         * If this isn’t in the conditional, some of the tests fail
         * because `messageId` is present in the problem object
         */
        if (options.messageId) {
            problem.messageId = options.messageId;
        }
        if (options.loc.end) {
            problem.endLine = options.loc.end.line;
            problem.endColumn = options.loc.end.column + 1;
        }
        if (options.fix) {
            problem.fix = options.fix;
        }
        if (options.suggestions && options.suggestions.length > 0) {
            problem.suggestions = options.suggestions;
        }
        return problem;
    }