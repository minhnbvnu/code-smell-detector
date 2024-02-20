function getGlobalIterableIteratorType(reportErrors2) {
                return deferredGlobalIterableIteratorType || (deferredGlobalIterableIteratorType = getGlobalType("IterableIterator", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }