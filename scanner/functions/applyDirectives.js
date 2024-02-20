function applyDirectives(options) {
        const problems = [];
        const usedDisableDirectives = new Set();
        for (const problem of options.problems) {
            let disableDirectivesForProblem = [];
            let nextDirectiveIndex = 0;
            while (nextDirectiveIndex < options.directives.length &&
                compareLocations(options.directives[nextDirectiveIndex], problem) <= 0) {
                const directive = options.directives[nextDirectiveIndex++];
                if (directive.ruleId === null || directive.ruleId === problem.ruleId) {
                    switch (directive.type) {
                        case "disable":
                            disableDirectivesForProblem.push(directive);
                            break;
                        case "enable":
                            disableDirectivesForProblem = [];
                            break;
                        // no default
                    }
                }
            }
            if (disableDirectivesForProblem.length > 0) {
                const suppressions = disableDirectivesForProblem.map(directive => ({
                    kind: "directive",
                    justification: directive.unprocessedDirective.justification
                }));
                if (problem.suppressions) {
                    problem.suppressions = problem.suppressions.concat(suppressions);
                }
                else {
                    problem.suppressions = suppressions;
                    usedDisableDirectives.add(disableDirectivesForProblem[disableDirectivesForProblem.length - 1]);
                }
            }
            problems.push(problem);
        }
        const unusedDisableDirectivesToReport = options.directives
            .filter(directive => directive.type === "disable" && !usedDisableDirectives.has(directive));
        const processed = processUnusedDisableDirectives(unusedDisableDirectivesToReport);
        const unusedDisableDirectives = processed
            .map(({ description, fix, unprocessedDirective }) => {
            const { parentComment, type, line, column } = unprocessedDirective;
            return {
                ruleId: null,
                message: description
                    ? `Unused eslint-disable directive (no problems were reported from ${description}).`
                    : "Unused eslint-disable directive (no problems were reported).",
                line: type === "disable-next-line" ? parentComment.commentToken.loc.start.line : line,
                column: type === "disable-next-line" ? parentComment.commentToken.loc.start.column + 1 : column,
                severity: options.reportUnusedDisableDirectives === "warn" ? 1 : 2,
                nodeType: null,
                ...options.disableFixes ? {} : { fix }
            };
        });
        return { problems, unusedDisableDirectives };
    }