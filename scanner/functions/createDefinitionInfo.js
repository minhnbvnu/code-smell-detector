function createDefinitionInfo(declaration, checker, symbol, node, unverified, failedAliasResolution) {
            const symbolName2 = checker.symbolToString(symbol);
            const symbolKind = ts_SymbolDisplay_exports.getSymbolKind(checker, symbol, node);
            const containerName = symbol.parent ? checker.symbolToString(symbol.parent, node) : "";
            return createDefinitionInfoFromName(checker, declaration, symbolKind, symbolName2, containerName, unverified, failedAliasResolution);
        }