function getSymbolForExpression(e) {
                if (canHaveSymbol(e) && e.symbol) {
                    return e.symbol;
                }
                if (isIdentifier(e)) {
                    return getResolvedSymbol(e);
                }
                if (isPropertyAccessExpression(e)) {
                    const lhsType = getTypeOfExpression(e.expression);
                    return isPrivateIdentifier(e.name) ? tryGetPrivateIdentifierPropertyOfType(lhsType, e.name) : getPropertyOfType(lhsType, e.name.escapedText);
                }
                if (isElementAccessExpression(e)) {
                    const propType = checkExpressionCached(e.argumentExpression);
                    if (!isTypeUsableAsPropertyName(propType)) {
                        return void 0;
                    }
                    const lhsType = getTypeOfExpression(e.expression);
                    return getPropertyOfType(lhsType, getPropertyNameFromType(propType));
                }
                return void 0;
                function tryGetPrivateIdentifierPropertyOfType(type, id) {
                    const lexicallyScopedSymbol = lookupSymbolForPrivateIdentifierDeclaration(id.escapedText, id);
                    return lexicallyScopedSymbol && getPrivateIdentifierPropertyOfType(type, lexicallyScopedSymbol);
                }
            }