function getNamesForExportedSymbol(symbol, scriptTarget) {
            if (needsNameFromDeclaration(symbol)) {
                const fromDeclaration = getDefaultLikeExportNameFromDeclaration(symbol);
                if (fromDeclaration)
                    return fromDeclaration;
                const fileNameCase = ts_codefix_exports.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, 
                /*preferCapitalized*/
                false);
                const capitalized = ts_codefix_exports.moduleSymbolToValidIdentifier(getSymbolParentOrFail(symbol), scriptTarget, 
                /*preferCapitalized*/
                true);
                if (fileNameCase === capitalized)
                    return fileNameCase;
                return [fileNameCase, capitalized];
            }
            return symbol.name;
        }