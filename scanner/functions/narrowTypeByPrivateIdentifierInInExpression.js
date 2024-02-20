function narrowTypeByPrivateIdentifierInInExpression(type, expr, assumeTrue) {
                    const target = getReferenceCandidate(expr.right);
                    if (!isMatchingReference(reference, target)) {
                        return type;
                    }
                    Debug.assertNode(expr.left, isPrivateIdentifier);
                    const symbol = getSymbolForPrivateIdentifierExpression(expr.left);
                    if (symbol === void 0) {
                        return type;
                    }
                    const classSymbol = symbol.parent;
                    const targetType = hasStaticModifier(Debug.checkDefined(symbol.valueDeclaration, "should always have a declaration")) ? getTypeOfSymbol(classSymbol) : getDeclaredTypeOfSymbol(classSymbol);
                    return getNarrowedType(type, targetType, assumeTrue, 
                    /*checkDerived*/
                    true);
                }