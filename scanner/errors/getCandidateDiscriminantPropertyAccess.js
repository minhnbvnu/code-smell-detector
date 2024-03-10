function getCandidateDiscriminantPropertyAccess(expr) {
                    if (isBindingPattern(reference) || isFunctionExpressionOrArrowFunction(reference) || isObjectLiteralMethod(reference)) {
                        if (isIdentifier(expr)) {
                            const symbol = getResolvedSymbol(expr);
                            const declaration = symbol.valueDeclaration;
                            if (declaration && (isBindingElement(declaration) || isParameter(declaration)) && reference === declaration.parent && !declaration.initializer && !declaration.dotDotDotToken) {
                                return declaration;
                            }
                        }
                    }
                    else if (isAccessExpression(expr)) {
                        if (isMatchingReference(reference, expr.expression)) {
                            return expr;
                        }
                    }
                    else if (isIdentifier(expr)) {
                        const symbol = getResolvedSymbol(expr);
                        if (isConstVariable(symbol)) {
                            const declaration = symbol.valueDeclaration;
                            if (isVariableDeclaration(declaration) && !declaration.type && declaration.initializer && isAccessExpression(declaration.initializer) && isMatchingReference(reference, declaration.initializer.expression)) {
                                return declaration.initializer;
                            }
                            if (isBindingElement(declaration) && !declaration.initializer) {
                                const parent2 = declaration.parent.parent;
                                if (isVariableDeclaration(parent2) && !parent2.type && parent2.initializer && (isIdentifier(parent2.initializer) || isAccessExpression(parent2.initializer)) && isMatchingReference(reference, parent2.initializer)) {
                                    return declaration;
                                }
                            }
                        }
                    }
                    return void 0;
                }