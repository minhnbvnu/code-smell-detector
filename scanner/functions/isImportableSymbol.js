function isImportableSymbol(symbol, checker) {
            return !checker.isUndefinedSymbol(symbol) && !checker.isUnknownSymbol(symbol) && !isKnownSymbol(symbol) && !isPrivateIdentifierSymbol(symbol);
        }