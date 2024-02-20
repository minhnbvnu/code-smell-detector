function resolveImportSymbolType(node, links, symbol, meaning) {
                const resolvedSymbol = resolveSymbol(symbol);
                links.resolvedSymbol = resolvedSymbol;
                if (meaning === 111551 /* Value */) {
                    return getInstantiationExpressionType(getTypeOfSymbol(symbol), node);
                }
                else {
                    return getTypeReferenceType(node, resolvedSymbol);
                }
            }