function getDefinedMessageData(unusedVar) {
                        var _a;
                        const defType = (_a = unusedVar === null || unusedVar === void 0 ? void 0 : unusedVar.defs[0]) === null || _a === void 0 ? void 0 : _a.type;
                        let type;
                        let pattern;
                        if (defType === utils_1.TSESLint.Scope.DefinitionType.CatchClause &&
                            options.caughtErrorsIgnorePattern) {
                            type = 'args';
                            pattern = options.caughtErrorsIgnorePattern.toString();
                        }
                        else if (defType === utils_1.TSESLint.Scope.DefinitionType.Parameter &&
                            options.argsIgnorePattern) {
                            type = 'args';
                            pattern = options.argsIgnorePattern.toString();
                        }
                        else if (defType !== utils_1.TSESLint.Scope.DefinitionType.Parameter &&
                            options.varsIgnorePattern) {
                            type = 'vars';
                            pattern = options.varsIgnorePattern.toString();
                        }
                        const additional = type
                            ? `. Allowed unused ${type} must match ${pattern}`
                            : '';
                        return {
                            varName: unusedVar.name,
                            action: 'defined',
                            additional,
                        };
                    }