function getGlobalPromiseType(reportErrors2) {
                return deferredGlobalPromiseType || (deferredGlobalPromiseType = getGlobalType("Promise", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }