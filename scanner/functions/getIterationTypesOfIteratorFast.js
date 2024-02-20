function getIterationTypesOfIteratorFast(type, resolver) {
                const globalType = resolver.getGlobalIterableIteratorType(
                /*reportErrors*/
                false);
                if (isReferenceToType2(type, globalType)) {
                    const [yieldType] = getTypeArguments(type);
                    const globalIterationTypes = getIterationTypesOfIteratorCached(globalType, resolver) || getIterationTypesOfIteratorSlow(globalType, resolver, 
                    /*errorNode*/
                    void 0, 
                    /*errorOutputContainer*/
                    void 0, 
                    /*noCache*/
                    false);
                    const { returnType, nextType } = globalIterationTypes === noIterationTypes ? defaultIterationTypes : globalIterationTypes;
                    return setCachedIterationTypes(type, resolver.iteratorCacheKey, createIterationTypes(yieldType, returnType, nextType));
                }
                if (isReferenceToType2(type, resolver.getGlobalIteratorType(
                /*reportErrors*/
                false)) || isReferenceToType2(type, resolver.getGlobalGeneratorType(
                /*reportErrors*/
                false))) {
                    const [yieldType, returnType, nextType] = getTypeArguments(type);
                    return setCachedIterationTypes(type, resolver.iteratorCacheKey, createIterationTypes(yieldType, returnType, nextType));
                }
            }