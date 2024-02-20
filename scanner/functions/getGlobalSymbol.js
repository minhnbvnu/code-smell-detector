function getGlobalSymbol(name, meaning, diagnostic) {
                return resolveName(void 0, name, meaning, diagnostic, name, 
                /*isUse*/
                false, 
                /*excludeGlobals*/
                false, 
                /*getSpellingSuggestions*/
                false);
            }