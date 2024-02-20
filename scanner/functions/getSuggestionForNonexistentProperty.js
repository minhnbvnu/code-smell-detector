function getSuggestionForNonexistentProperty(name, containingType) {
                const suggestion = getSuggestedSymbolForNonexistentProperty(name, containingType);
                return suggestion && symbolName(suggestion);
            }