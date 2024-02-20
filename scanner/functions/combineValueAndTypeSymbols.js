function combineValueAndTypeSymbols(valueSymbol, typeSymbol) {
                if (valueSymbol === unknownSymbol && typeSymbol === unknownSymbol) {
                    return unknownSymbol;
                }
                if (valueSymbol.flags & (788968 /* Type */ | 1920 /* Namespace */)) {
                    return valueSymbol;
                }
                const result = createSymbol(valueSymbol.flags | typeSymbol.flags, valueSymbol.escapedName);
                Debug.assert(valueSymbol.declarations || typeSymbol.declarations);
                result.declarations = deduplicate(concatenate(valueSymbol.declarations, typeSymbol.declarations), equateValues);
                result.parent = valueSymbol.parent || typeSymbol.parent;
                if (valueSymbol.valueDeclaration)
                    result.valueDeclaration = valueSymbol.valueDeclaration;
                if (typeSymbol.members)
                    result.members = new Map(typeSymbol.members);
                if (valueSymbol.exports)
                    result.exports = new Map(valueSymbol.exports);
                return result;
            }