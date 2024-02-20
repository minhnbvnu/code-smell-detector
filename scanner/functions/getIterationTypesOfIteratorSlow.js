function getIterationTypesOfIteratorSlow(type, resolver, errorNode, errorOutputContainer, noCache) {
                const iterationTypes = combineIterationTypes([
                    getIterationTypesOfMethod(type, resolver, "next", errorNode, errorOutputContainer),
                    getIterationTypesOfMethod(type, resolver, "return", errorNode, errorOutputContainer),
                    getIterationTypesOfMethod(type, resolver, "throw", errorNode, errorOutputContainer)
                ]);
                return noCache ? iterationTypes : setCachedIterationTypes(type, resolver.iteratorCacheKey, iterationTypes);
            }