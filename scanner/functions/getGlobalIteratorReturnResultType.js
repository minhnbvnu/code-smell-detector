function getGlobalIteratorReturnResultType(reportErrors2) {
                return deferredGlobalIteratorReturnResultType || (deferredGlobalIteratorReturnResultType = getGlobalType("IteratorReturnResult", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }