function getPropertyNameOfWellKnownSymbol(checker, symbolConstructor, symbolName) {
        const knownSymbol = symbolConstructor &&
            checker.getTypeOfSymbolAtLocation(symbolConstructor, symbolConstructor.valueDeclaration).getProperty(symbolName);
        const knownSymbolType = knownSymbol && checker.getTypeOfSymbolAtLocation(knownSymbol, knownSymbol.valueDeclaration);
        if (knownSymbolType && type_1.isUniqueESSymbolType(knownSymbolType))
            return knownSymbolType.escapedName;
        return ('__@' + symbolName);
    }