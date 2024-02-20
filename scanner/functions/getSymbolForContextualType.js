function getSymbolForContextualType(node, checker) {
            const element = getContainingObjectLiteralElement(node);
            if (element) {
                const contextualType = checker.getContextualTypeForObjectLiteralElement(element);
                const symbol = contextualType == null ? void 0 : contextualType.getSymbol();
                if (symbol && !(getCheckFlags(symbol) & 6 /* Synthetic */)) {
                    return symbol;
                }
            }
        }