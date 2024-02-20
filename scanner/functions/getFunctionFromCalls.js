function getFunctionFromCalls(calls) {
                return checker.createAnonymousType(
                /*symbol*/
                void 0, createSymbolTable(), [getSignatureFromCalls(calls)], emptyArray, emptyArray);
            }