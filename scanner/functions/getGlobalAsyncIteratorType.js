function getGlobalAsyncIteratorType(reportErrors2) {
                return deferredGlobalAsyncIteratorType || (deferredGlobalAsyncIteratorType = getGlobalType("AsyncIterator", 
                /*arity*/
                3, reportErrors2)) || emptyGenericType;
            }