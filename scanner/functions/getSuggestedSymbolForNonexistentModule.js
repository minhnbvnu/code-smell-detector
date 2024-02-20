function getSuggestedSymbolForNonexistentModule(name, targetModule) {
                return targetModule.exports && getSpellingSuggestionForName(idText(name), getExportsOfModuleAsArray(targetModule), 2623475 /* ModuleMember */);
            }