function symbolToDisplayParts(typeChecker, symbol, enclosingDeclaration, meaning, flags = 0 /* None */) {
            return mapToDisplayParts((writer) => {
                typeChecker.writeSymbol(symbol, enclosingDeclaration, meaning, flags | 8 /* UseAliasDefinedOutsideCurrentScope */, writer);
            });
        }