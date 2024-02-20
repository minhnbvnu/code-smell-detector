function getDirectiveComments(ast, ruleMapper, warnInlineConfig) {
        const configuredRules = {};
        const enabledGlobals = Object.create(null);
        const exportedVariables = {};
        const problems = [];
        const disableDirectives = [];
        const validator = new ConfigValidator({
            builtInRules: Rules
        });
        ast.comments.filter(token => token.type !== "Shebang").forEach(comment => {
            const { directivePart, justificationPart } = extractDirectiveComment(comment.value);
            const match = directivesPattern.exec(directivePart);
            if (!match) {
                return;
            }
            const directiveText = match[1];
            const lineCommentSupported = /^eslint-disable-(next-)?line$/u.test(directiveText);
            if (comment.type === "Line" && !lineCommentSupported) {
                return;
            }
            if (warnInlineConfig) {
                const kind = comment.type === "Block" ? `/*${directiveText}*/` : `//${directiveText}`;
                problems.push(createLintingProblem({
                    ruleId: null,
                    message: `'${kind}' has no effect because you have 'noInlineConfig' setting in ${warnInlineConfig}.`,
                    loc: comment.loc,
                    severity: 1
                }));
                return;
            }
            if (directiveText === "eslint-disable-line" && comment.loc.start.line !== comment.loc.end.line) {
                const message = `${directiveText} comment should not span multiple lines.`;
                problems.push(createLintingProblem({
                    ruleId: null,
                    message,
                    loc: comment.loc
                }));
                return;
            }
            const directiveValue = directivePart.slice(match.index + directiveText.length);
            switch (directiveText) {
                case "eslint-disable":
                case "eslint-enable":
                case "eslint-disable-next-line":
                case "eslint-disable-line": {
                    const directiveType = directiveText.slice("eslint-".length);
                    const options = { commentToken: comment, type: directiveType, value: directiveValue, justification: justificationPart, ruleMapper };
                    const { directives, directiveProblems } = createDisableDirectives(options);
                    disableDirectives.push(...directives);
                    problems.push(...directiveProblems);
                    break;
                }
                case "exported":
                    Object.assign(exportedVariables, commentParser.parseStringConfig(directiveValue, comment));
                    break;
                case "globals":
                case "global":
                    for (const [id, { value }] of Object.entries(commentParser.parseStringConfig(directiveValue, comment))) {
                        let normalizedValue;
                        try {
                            normalizedValue = ConfigOps.normalizeConfigGlobal(value);
                        }
                        catch (err) {
                            problems.push(createLintingProblem({
                                ruleId: null,
                                loc: comment.loc,
                                message: err.message
                            }));
                            continue;
                        }
                        if (enabledGlobals[id]) {
                            enabledGlobals[id].comments.push(comment);
                            enabledGlobals[id].value = normalizedValue;
                        }
                        else {
                            enabledGlobals[id] = {
                                comments: [comment],
                                value: normalizedValue
                            };
                        }
                    }
                    break;
                case "eslint": {
                    const parseResult = commentParser.parseJsonConfig(directiveValue, comment.loc);
                    if (parseResult.success) {
                        Object.keys(parseResult.config).forEach(name => {
                            const rule = ruleMapper(name);
                            const ruleValue = parseResult.config[name];
                            if (!rule) {
                                problems.push(createLintingProblem({ ruleId: name, loc: comment.loc }));
                                return;
                            }
                            try {
                                validator.validateRuleOptions(rule, name, ruleValue);
                            }
                            catch (err) {
                                problems.push(createLintingProblem({
                                    ruleId: name,
                                    message: err.message,
                                    loc: comment.loc
                                }));
                                // do not apply the config, if found invalid options.
                                return;
                            }
                            configuredRules[name] = ruleValue;
                        });
                    }
                    else {
                        problems.push(parseResult.error);
                    }
                    break;
                }
                // no default
            }
        });
        return {
            configuredRules,
            enabledGlobals,
            exportedVariables,
            problems,
            disableDirectives
        };
    }