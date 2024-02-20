function getAsyncFromSyncIterationTypes(iterationTypes, errorNode) {
                if (iterationTypes === noIterationTypes)
                    return noIterationTypes;
                if (iterationTypes === anyIterationTypes)
                    return anyIterationTypes;
                const { yieldType, returnType, nextType } = iterationTypes;
                if (errorNode) {
                    getGlobalAwaitedSymbol(
                    /*reportErrors*/
                    true);
                }
                return createIterationTypes(getAwaitedType(yieldType, errorNode) || anyType, getAwaitedType(returnType, errorNode) || anyType, nextType);
            }