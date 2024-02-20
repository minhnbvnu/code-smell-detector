function convertStatement(sourceFile, statement, checker, changes, identifiers, target, exports, useSitesToUnqualify, quotePreference) {
            switch (statement.kind) {
                case 240 /* VariableStatement */:
                    convertVariableStatement(sourceFile, statement, changes, checker, identifiers, target, quotePreference);
                    return false;
                case 241 /* ExpressionStatement */: {
                    const { expression } = statement;
                    switch (expression.kind) {
                        case 210 /* CallExpression */: {
                            if (isRequireCall(expression, 
                            /*checkArgumentIsStringLiteralLike*/
                            true)) {
                                changes.replaceNode(sourceFile, statement, makeImport(
                                /*name*/
                                void 0, 
                                /*namedImports*/
                                void 0, expression.arguments[0], quotePreference));
                            }
                            return false;
                        }
                        case 223 /* BinaryExpression */: {
                            const { operatorToken } = expression;
                            return operatorToken.kind === 63 /* EqualsToken */ && convertAssignment(sourceFile, checker, expression, changes, exports, useSitesToUnqualify);
                        }
                    }
                }
                default:
                    return false;
            }
        }