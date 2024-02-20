function getGlobalPromiseConstructorSymbol(reportErrors2) {
                return deferredGlobalPromiseConstructorSymbol || (deferredGlobalPromiseConstructorSymbol = getGlobalValueSymbol("Promise", reportErrors2));
            }