function getGlobalPromiseConstructorLikeType(reportErrors2) {
                return deferredGlobalPromiseConstructorLikeType || (deferredGlobalPromiseConstructorLikeType = getGlobalType("PromiseConstructorLike", 
                /*arity*/
                0, reportErrors2)) || emptyObjectType;
            }