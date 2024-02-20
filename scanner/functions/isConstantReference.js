function isConstantReference(node) {
                switch (node.kind) {
                    case 79 /* Identifier */:
                        if (!isThisInTypeQuery(node)) {
                            const symbol = getResolvedSymbol(node);
                            return isConstVariable(symbol) || isParameterOrCatchClauseVariable(symbol) && !isSymbolAssigned(symbol);
                        }
                        break;
                    case 208 /* PropertyAccessExpression */:
                    case 209 /* ElementAccessExpression */:
                        return isConstantReference(node.expression) && isReadonlySymbol(getNodeLinks(node).resolvedSymbol || unknownSymbol);
                }
                return false;
            }