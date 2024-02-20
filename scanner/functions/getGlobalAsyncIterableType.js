function getGlobalAsyncIterableType(reportErrors2) {
                return deferredGlobalAsyncIterableType || (deferredGlobalAsyncIterableType = getGlobalType("AsyncIterable", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }