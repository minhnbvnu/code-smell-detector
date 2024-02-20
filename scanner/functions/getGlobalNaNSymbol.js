function getGlobalNaNSymbol() {
                return deferredGlobalNaNSymbol || (deferredGlobalNaNSymbol = getGlobalValueSymbol("NaN", 
                /*reportErrors*/
                false));
            }