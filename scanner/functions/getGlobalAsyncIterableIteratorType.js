function getGlobalAsyncIterableIteratorType(reportErrors2) {
                return deferredGlobalAsyncIterableIteratorType || (deferredGlobalAsyncIterableIteratorType = getGlobalType("AsyncIterableIterator", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }