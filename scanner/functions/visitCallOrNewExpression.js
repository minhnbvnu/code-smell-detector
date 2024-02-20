function visitCallOrNewExpression(expr) {
                const args = expr.arguments;
                if (!args || !args.length) {
                    return;
                }
                const candidates = [];
                const signature = checker.getResolvedSignatureForSignatureHelp(expr, candidates);
                if (!signature || !candidates.length) {
                    return;
                }
                for (let i = 0; i < args.length; ++i) {
                    const originalArg = args[i];
                    const arg = skipParentheses(originalArg);
                    if (shouldShowLiteralParameterNameHintsOnly(preferences) && !isHintableLiteral(arg)) {
                        continue;
                    }
                    const identifierNameInfo = checker.getParameterIdentifierNameAtPosition(signature, i);
                    if (identifierNameInfo) {
                        const [parameterName, isFirstVariadicArgument] = identifierNameInfo;
                        const isParameterNameNotSameAsArgument = preferences.includeInlayParameterNameHintsWhenArgumentMatchesName || !identifierOrAccessExpressionPostfixMatchesParameterName(arg, parameterName);
                        if (!isParameterNameNotSameAsArgument && !isFirstVariadicArgument) {
                            continue;
                        }
                        const name = unescapeLeadingUnderscores(parameterName);
                        if (leadingCommentsContainsParameterName(arg, name)) {
                            continue;
                        }
                        addParameterHints(name, originalArg.getStart(), isFirstVariadicArgument);
                    }
                }
            }