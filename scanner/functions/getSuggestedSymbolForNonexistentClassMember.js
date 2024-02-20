function getSuggestedSymbolForNonexistentClassMember(name, baseType) {
                return getSpellingSuggestionForName(name, getPropertiesOfType(baseType), 106500 /* ClassMember */);
            }