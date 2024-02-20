function getReferencedValueOrAliasSymbol(reference) {
                const resolvedSymbol = getNodeLinks(reference).resolvedSymbol;
                if (resolvedSymbol && resolvedSymbol !== unknownSymbol) {
                    return resolvedSymbol;
                }
                return resolveName(reference, reference.escapedText, 111551 /* Value */ | 1048576 /* ExportValue */ | 2097152 /* Alias */, 
                /*nodeNotFoundMessage*/
                void 0, 
                /*nameArg*/
                void 0, 
                /*isUse*/
                true, 
                /*excludeGlobals*/
                void 0, 
                /*getSpellingSuggestions*/
                void 0);
            }