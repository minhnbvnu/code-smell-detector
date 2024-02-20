function getIterationTypesOfIterableSlow(type, resolver, errorNode, errorOutputContainer, noCache) {
                var _a2;
                const method = getPropertyOfType(type, getPropertyNameForKnownSymbolName(resolver.iteratorSymbolName));
                const methodType = method && !(method.flags & 16777216 /* Optional */) ? getTypeOfSymbol(method) : void 0;
                if (isTypeAny(methodType)) {
                    return noCache ? anyIterationTypes : setCachedIterationTypes(type, resolver.iterableCacheKey, anyIterationTypes);
                }
                const signatures = methodType ? getSignaturesOfType(methodType, 0 /* Call */) : void 0;
                if (!some(signatures)) {
                    return noCache ? noIterationTypes : setCachedIterationTypes(type, resolver.iterableCacheKey, noIterationTypes);
                }
                const iteratorType = getIntersectionType(map(signatures, getReturnTypeOfSignature));
                const iterationTypes = (_a2 = getIterationTypesOfIteratorWorker(iteratorType, resolver, errorNode, errorOutputContainer, noCache)) != null ? _a2 : noIterationTypes;
                return noCache ? iterationTypes : setCachedIterationTypes(type, resolver.iterableCacheKey, iterationTypes);
            }