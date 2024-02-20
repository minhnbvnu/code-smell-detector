function getGlobalRecordSymbol() {
                deferredGlobalRecordSymbol || (deferredGlobalRecordSymbol = getGlobalTypeAliasSymbol("Record", 
                /*arity*/
                2, 
                /*reportErrors*/
                true) || unknownSymbol);
                return deferredGlobalRecordSymbol === unknownSymbol ? void 0 : deferredGlobalRecordSymbol;
            }