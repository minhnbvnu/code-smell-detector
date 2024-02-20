function tryGetPrivateIdentifierPropertyOfType(type, id) {
                    const lexicallyScopedSymbol = lookupSymbolForPrivateIdentifierDeclaration(id.escapedText, id);
                    return lexicallyScopedSymbol && getPrivateIdentifierPropertyOfType(type, lexicallyScopedSymbol);
                }