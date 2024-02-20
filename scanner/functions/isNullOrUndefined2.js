function isNullOrUndefined2({ checker }, node) {
            if (node.kind === 104 /* NullKeyword */)
                return true;
            if (isIdentifier(node) && !isGeneratedIdentifier(node) && idText(node) === "undefined") {
                const symbol = checker.getSymbolAtLocation(node);
                return !symbol || checker.isUndefinedSymbol(symbol);
            }
            return false;
        }