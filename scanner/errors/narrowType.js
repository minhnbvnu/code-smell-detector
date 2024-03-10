function narrowType(type, expr, assumeTrue) {
                    if (isExpressionOfOptionalChainRoot(expr) || isBinaryExpression(expr.parent) && (expr.parent.operatorToken.kind === 60 /* QuestionQuestionToken */ || expr.parent.operatorToken.kind === 77 /* QuestionQuestionEqualsToken */) && expr.parent.left === expr) {
                        return narrowTypeByOptionality(type, expr, assumeTrue);
                    }
                    switch (expr.kind) {
                        case 79 /* Identifier */:
                            if (!isMatchingReference(reference, expr) && inlineLevel < 5) {
                                const symbol = getResolvedSymbol(expr);
                                if (isConstVariable(symbol)) {
                                    const declaration = symbol.valueDeclaration;
                                    if (declaration && isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isConstantReference(reference)) {
                                        inlineLevel++;
                                        const result = narrowType(type, declaration.initializer, assumeTrue);
                                        inlineLevel--;
                                        return result;
                                    }
                                }
                            }
                        case 108 /* ThisKeyword */:
                        case 106 /* SuperKeyword */:
                        case 208 /* PropertyAccessExpression */:
                        case 209 /* ElementAccessExpression */:
                            return narrowTypeByTruthiness(type, expr, assumeTrue);
                        case 210 /* CallExpression */:
                            return narrowTypeByCallExpression(type, expr, assumeTrue);
                        case 214 /* ParenthesizedExpression */:
                        case 232 /* NonNullExpression */:
                            return narrowType(type, expr.expression, assumeTrue);
                        case 223 /* BinaryExpression */:
                            return narrowTypeByBinaryExpression(type, expr, assumeTrue);
                        case 221 /* PrefixUnaryExpression */:
                            if (expr.operator === 53 /* ExclamationToken */) {
                                return narrowType(type, expr.operand, !assumeTrue);
                            }
                            break;
                    }
                    return type;
                }