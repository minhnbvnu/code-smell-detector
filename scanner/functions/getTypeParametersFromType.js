function getTypeParametersFromType(type, checker) {
        const symAtLocation = checker.getSymbolAtLocation(type);
        if (!symAtLocation) {
            return undefined;
        }
        const sym = getAliasedSymbol(symAtLocation, checker);
        const declarations = sym.getDeclarations();
        if (!declarations) {
            return undefined;
        }
        return (0, util_1.findFirstResult)(declarations, decl => ts.isClassLike(decl) ||
            ts.isTypeAliasDeclaration(decl) ||
            ts.isInterfaceDeclaration(decl)
            ? decl.typeParameters
            : undefined);
    }