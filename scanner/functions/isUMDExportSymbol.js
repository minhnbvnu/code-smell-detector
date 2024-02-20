function isUMDExportSymbol(symbol) {
            return !!symbol && !!symbol.declarations && !!symbol.declarations[0] && isNamespaceExportDeclaration(symbol.declarations[0]);
        }