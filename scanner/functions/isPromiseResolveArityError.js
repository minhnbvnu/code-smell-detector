function isPromiseResolveArityError(node) {
                if (!isCallExpression(node) || !isIdentifier(node.expression))
                    return false;
                const symbol = resolveName(node.expression, node.expression.escapedText, 111551 /* Value */, void 0, void 0, false);
                const decl = symbol == null ? void 0 : symbol.valueDeclaration;
                if (!decl || !isParameter(decl) || !isFunctionExpressionOrArrowFunction(decl.parent) || !isNewExpression(decl.parent.parent) || !isIdentifier(decl.parent.parent.expression)) {
                    return false;
                }
                const globalPromiseSymbol = getGlobalPromiseConstructorSymbol(
                /*reportErrors*/
                false);
                if (!globalPromiseSymbol)
                    return false;
                const constructorSymbol = getSymbolAtLocation(decl.parent.parent.expression, 
                /*ignoreErrors*/
                true);
                return constructorSymbol === globalPromiseSymbol;
            }