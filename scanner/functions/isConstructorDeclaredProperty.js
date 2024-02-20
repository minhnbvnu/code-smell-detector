function isConstructorDeclaredProperty(symbol) {
                if (symbol.valueDeclaration && isBinaryExpression(symbol.valueDeclaration)) {
                    const links = getSymbolLinks(symbol);
                    if (links.isConstructorDeclaredProperty === void 0) {
                        links.isConstructorDeclaredProperty = false;
                        links.isConstructorDeclaredProperty = !!getDeclaringConstructor(symbol) && every(symbol.declarations, (declaration) => isBinaryExpression(declaration) && isPossiblyAliasedThisProperty(declaration) && (declaration.left.kind !== 209 /* ElementAccessExpression */ || isStringOrNumericLiteralLike(declaration.left.argumentExpression)) && !getAnnotatedTypeForAssignmentDeclaration(
                        /*declaredType*/
                        void 0, declaration, symbol, declaration));
                    }
                    return links.isConstructorDeclaredProperty;
                }
                return false;
            }