function getFullyQualifiedName(symbol, containingLocation) {
                return symbol.parent ? getFullyQualifiedName(symbol.parent, containingLocation) + "." + symbolToString(symbol) : symbolToString(symbol, containingLocation, 
                /*meaning*/
                void 0, 32 /* DoNotIncludeSymbolChain */ | 4 /* AllowAnyNodeKind */);
            }