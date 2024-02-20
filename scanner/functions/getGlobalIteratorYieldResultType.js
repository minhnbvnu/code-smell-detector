function getGlobalIteratorYieldResultType(reportErrors2) {
                return deferredGlobalIteratorYieldResultType || (deferredGlobalIteratorYieldResultType = getGlobalType("IteratorYieldResult", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }