function getGlobalAsyncGeneratorType(reportErrors2) {
                return deferredGlobalAsyncGeneratorType || (deferredGlobalAsyncGeneratorType = getGlobalType("AsyncGenerator", 
                /*arity*/
                3, reportErrors2)) || emptyGenericType;
            }