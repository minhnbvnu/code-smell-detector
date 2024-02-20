function getGlobalOmitSymbol() {
                deferredGlobalOmitSymbol || (deferredGlobalOmitSymbol = getGlobalTypeAliasSymbol("Omit", 
                /*arity*/
                2, 
                /*reportErrors*/
                true) || unknownSymbol);
                return deferredGlobalOmitSymbol === unknownSymbol ? void 0 : deferredGlobalOmitSymbol;
            }