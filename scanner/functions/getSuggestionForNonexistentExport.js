function getSuggestionForNonexistentExport(name, targetModule) {
                const suggestion = getSuggestedSymbolForNonexistentModule(name, targetModule);
                return suggestion && symbolName(suggestion);
            }