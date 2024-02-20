function getNameForExportedSymbol(symbol, scriptTarget, preferCapitalized) {
            if (needsNameFromDeclaration(symbol)) {
                return getDefaultLikeExportNameFromDeclaration(symbol) || ts_codefix_exports.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, !!preferCapitalized);
            }
            return symbol.name;
        }