function resolveName(location, name, meaning, nameNotFoundMessage, nameArg, isUse, excludeGlobals = false, getSpellingSuggestions = true) {
                return resolveNameHelper(location, name, meaning, nameNotFoundMessage, nameArg, isUse, excludeGlobals, getSpellingSuggestions, getSymbol2);
            }