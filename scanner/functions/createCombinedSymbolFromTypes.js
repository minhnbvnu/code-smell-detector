function createCombinedSymbolFromTypes(sources, types) {
                return createCombinedSymbolForOverloadFailure(sources, getUnionType(types, 2 /* Subtype */));
            }