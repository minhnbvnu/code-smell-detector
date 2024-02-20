function isSpecifierTypeBased(parserServices, specifier) {
        const checker = parserServices.program.getTypeChecker();
        const node = parserServices.esTreeNodeToTSNodeMap.get(specifier.exported);
        const symbol = checker.getSymbolAtLocation(node);
        const aliasedSymbol = checker.getAliasedSymbol(symbol);
        if (!aliasedSymbol || aliasedSymbol.escapedName === 'unknown') {
            return undefined;
        }
        return !(aliasedSymbol.flags & typescript_1.SymbolFlags.Value);
    }