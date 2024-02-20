function getGlobalESSymbolType() {
                return deferredGlobalESSymbolType || (deferredGlobalESSymbolType = getGlobalType("Symbol", 
                /*arity*/
                0, 
                /*reportErrors*/
                false)) || emptyObjectType;
            }