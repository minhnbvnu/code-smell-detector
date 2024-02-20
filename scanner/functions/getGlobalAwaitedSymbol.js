function getGlobalAwaitedSymbol(reportErrors2) {
                deferredGlobalAwaitedSymbol || (deferredGlobalAwaitedSymbol = getGlobalTypeAliasSymbol("Awaited", 
                /*arity*/
                1, reportErrors2) || (reportErrors2 ? unknownSymbol : void 0));
                return deferredGlobalAwaitedSymbol === unknownSymbol ? void 0 : deferredGlobalAwaitedSymbol;
            }