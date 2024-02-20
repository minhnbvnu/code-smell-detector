function symbolIsValue(symbol, includeTypeOnlyMembers) {
                return !!(symbol.flags & 111551 /* Value */ || symbol.flags & 2097152 /* Alias */ && getAllSymbolFlags(symbol) & 111551 /* Value */ && (includeTypeOnlyMembers || !getTypeOnlyAliasDeclaration(symbol)));
            }