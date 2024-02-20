function getIterationTypesOfIterableFast(type, resolver) {
                let globalType;
                if (isReferenceToType2(type, globalType = resolver.getGlobalIterableType(
                /*reportErrors*/
                false)) || isReferenceToType2(type, globalType = resolver.getGlobalIterableIteratorType(
                /*reportErrors*/
                false))) {
                    const [yieldType] = getTypeArguments(type);
                    const { returnType, nextType } = getIterationTypesOfGlobalIterableType(globalType, resolver);
                    return setCachedIterationTypes(type, resolver.iterableCacheKey, createIterationTypes(resolver.resolveIterationType(yieldType, 
                    /*errorNode*/
                    void 0) || yieldType, resolver.resolveIterationType(returnType, 
                    /*errorNode*/
                    void 0) || returnType, nextType));
                }
                if (isReferenceToType2(type, resolver.getGlobalGeneratorType(
                /*reportErrors*/
                false))) {
                    const [yieldType, returnType, nextType] = getTypeArguments(type);
                    return setCachedIterationTypes(type, resolver.iterableCacheKey, createIterationTypes(resolver.resolveIterationType(yieldType, 
                    /*errorNode*/
                    void 0) || yieldType, resolver.resolveIterationType(returnType, 
                    /*errorNode*/
                    void 0) || returnType, nextType));
                }
            }