function isExplicitlyTypedSymbol(symbol, checker) {
        if (symbol === undefined)
            return false;
        if (util_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Function | ts.SymbolFlags.Method | ts.SymbolFlags.Class | ts.SymbolFlags.ValueModule))
            return true;
        if (!util_1.isSymbolFlagSet(symbol, ts.SymbolFlags.Variable | ts.SymbolFlags.Property))
            return false;
        if (symbol.valueDeclaration === undefined)
            return false;
        if (declarationHasExplicitTypeAnnotation(symbol.valueDeclaration))
            return true;
        return node_1.isVariableDeclaration(symbol.valueDeclaration) &&
            symbol.valueDeclaration.parent.parent.kind === ts.SyntaxKind.ForOfStatement &&
            isDottedNameWithExplicitTypeAnnotation(symbol.valueDeclaration.parent.parent.expression, checker);
    }