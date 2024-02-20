function hasSynthesizedDefaultSuperCall(constructor, hasExtendsClause) {
                if (!constructor || !hasExtendsClause) {
                    return false;
                }
                if (some(constructor.parameters)) {
                    return false;
                }
                const statement = firstOrUndefined(constructor.body.statements);
                if (!statement || !nodeIsSynthesized(statement) || statement.kind !== 241 /* ExpressionStatement */) {
                    return false;
                }
                const statementExpression = statement.expression;
                if (!nodeIsSynthesized(statementExpression) || statementExpression.kind !== 210 /* CallExpression */) {
                    return false;
                }
                const callTarget = statementExpression.expression;
                if (!nodeIsSynthesized(callTarget) || callTarget.kind !== 106 /* SuperKeyword */) {
                    return false;
                }
                const callArgument = singleOrUndefined(statementExpression.arguments);
                if (!callArgument || !nodeIsSynthesized(callArgument) || callArgument.kind !== 227 /* SpreadElement */) {
                    return false;
                }
                const expression = callArgument.expression;
                return isIdentifier(expression) && expression.escapedText === "arguments";
            }