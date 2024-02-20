function getGlobalIterableType(reportErrors2) {
                return deferredGlobalIterableType || (deferredGlobalIterableType = getGlobalType("Iterable", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }