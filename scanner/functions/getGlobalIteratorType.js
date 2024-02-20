function getGlobalIteratorType(reportErrors2) {
                return deferredGlobalIteratorType || (deferredGlobalIteratorType = getGlobalType("Iterator", 
                /*arity*/
                3, reportErrors2)) || emptyGenericType;
            }