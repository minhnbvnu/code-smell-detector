function nonAliasCanBeReferencedAtTypeLocation(symbol2) {
                return !!(symbol2.flags & 788968 /* Type */) || checker.isUnknownSymbol(symbol2) || !!(symbol2.flags & 1536 /* Module */) && addToSeen(seenModules, getSymbolId(symbol2)) && checker.getExportsOfModule(symbol2).some((e) => symbolCanBeReferencedAtTypeLocation(e, checker, seenModules));
            }