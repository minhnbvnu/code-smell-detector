function getIterationTypesOfIteratorResult(type) {
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                const cachedTypes2 = getCachedIterationTypes(type, "iterationTypesOfIteratorResult");
                if (cachedTypes2) {
                    return cachedTypes2;
                }
                if (isReferenceToType2(type, getGlobalIteratorYieldResultType(
                /*reportErrors*/
                false))) {
                    const yieldType2 = getTypeArguments(type)[0];
                    return setCachedIterationTypes(type, "iterationTypesOfIteratorResult", createIterationTypes(yieldType2, 
                    /*returnType*/
                    void 0, 
                    /*nextType*/
                    void 0));
                }
                if (isReferenceToType2(type, getGlobalIteratorReturnResultType(
                /*reportErrors*/
                false))) {
                    const returnType2 = getTypeArguments(type)[0];
                    return setCachedIterationTypes(type, "iterationTypesOfIteratorResult", createIterationTypes(
                    /*yieldType*/
                    void 0, returnType2, 
                    /*nextType*/
                    void 0));
                }
                const yieldIteratorResult = filterType(type, isYieldIteratorResult);
                const yieldType = yieldIteratorResult !== neverType ? getTypeOfPropertyOfType(yieldIteratorResult, "value") : void 0;
                const returnIteratorResult = filterType(type, isReturnIteratorResult);
                const returnType = returnIteratorResult !== neverType ? getTypeOfPropertyOfType(returnIteratorResult, "value") : void 0;
                if (!yieldType && !returnType) {
                    return setCachedIterationTypes(type, "iterationTypesOfIteratorResult", noIterationTypes);
                }
                return setCachedIterationTypes(type, "iterationTypesOfIteratorResult", createIterationTypes(yieldType, returnType || voidType, 
                /*nextType*/
                void 0));
            }