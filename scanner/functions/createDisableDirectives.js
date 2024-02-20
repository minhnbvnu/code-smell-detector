function createDisableDirectives(options) {
        const { commentToken, type, value, justification, ruleMapper } = options;
        const ruleIds = Object.keys(commentParser.parseListConfig(value));
        const directiveRules = ruleIds.length ? ruleIds : [null];
        const result = {
            directives: [],
            directiveProblems: [] // problems in directives
        };
        const parentComment = { commentToken, ruleIds };
        for (const ruleId of directiveRules) {
            // push to directives, if the rule is defined(including null, e.g. /*eslint enable*/)
            if (ruleId === null || !!ruleMapper(ruleId)) {
                if (type === "disable-next-line") {
                    result.directives.push({
                        parentComment,
                        type,
                        line: commentToken.loc.end.line,
                        column: commentToken.loc.end.column + 1,
                        ruleId,
                        justification
                    });
                }
                else {
                    result.directives.push({
                        parentComment,
                        type,
                        line: commentToken.loc.start.line,
                        column: commentToken.loc.start.column + 1,
                        ruleId,
                        justification
                    });
                }
            }
            else {
                result.directiveProblems.push(createLintingProblem({ ruleId, loc: commentToken.loc }));
            }
        }
        return result;
    }