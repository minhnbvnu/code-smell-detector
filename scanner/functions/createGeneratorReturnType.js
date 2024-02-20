function createGeneratorReturnType(yieldType, returnType, nextType, isAsyncGenerator) {
                const resolver = isAsyncGenerator ? asyncIterationTypesResolver : syncIterationTypesResolver;
                const globalGeneratorType = resolver.getGlobalGeneratorType(
                /*reportErrors*/
                false);
                yieldType = resolver.resolveIterationType(yieldType, 
                /*errorNode*/
                void 0) || unknownType;
                returnType = resolver.resolveIterationType(returnType, 
                /*errorNode*/
                void 0) || unknownType;
                nextType = resolver.resolveIterationType(nextType, 
                /*errorNode*/
                void 0) || unknownType;
                if (globalGeneratorType === emptyGenericType) {
                    const globalType = resolver.getGlobalIterableIteratorType(
                    /*reportErrors*/
                    false);
                    const iterationTypes = globalType !== emptyGenericType ? getIterationTypesOfGlobalIterableType(globalType, resolver) : void 0;
                    const iterableIteratorReturnType = iterationTypes ? iterationTypes.returnType : anyType;
                    const iterableIteratorNextType = iterationTypes ? iterationTypes.nextType : undefinedType;
                    if (isTypeAssignableTo(returnType, iterableIteratorReturnType) && isTypeAssignableTo(iterableIteratorNextType, nextType)) {
                        if (globalType !== emptyGenericType) {
                            return createTypeFromGenericGlobalType(globalType, [yieldType]);
                        }
                        resolver.getGlobalIterableIteratorType(
                        /*reportErrors*/
                        true);
                        return emptyObjectType;
                    }
                    resolver.getGlobalGeneratorType(
                    /*reportErrors*/
                    true);
                    return emptyObjectType;
                }
                return createTypeFromGenericGlobalType(globalGeneratorType, [yieldType, returnType, nextType]);
            }