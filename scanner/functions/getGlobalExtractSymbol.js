function getGlobalExtractSymbol() {
                deferredGlobalExtractSymbol || (deferredGlobalExtractSymbol = getGlobalTypeAliasSymbol("Extract", 
                /*arity*/
                2, 
                /*reportErrors*/
                true) || unknownSymbol);
                return deferredGlobalExtractSymbol === unknownSymbol ? void 0 : deferredGlobalExtractSymbol;
            }