function getSuggestionForNonexistentSymbol(location, outerName, meaning) {
                const symbolResult = getSuggestedSymbolForNonexistentSymbol(location, outerName, meaning);
                return symbolResult && symbolName(symbolResult);
            }