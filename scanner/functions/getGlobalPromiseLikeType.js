function getGlobalPromiseLikeType(reportErrors2) {
                return deferredGlobalPromiseLikeType || (deferredGlobalPromiseLikeType = getGlobalType("PromiseLike", 
                /*arity*/
                1, reportErrors2)) || emptyGenericType;
            }