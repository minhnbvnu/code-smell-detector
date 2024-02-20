function getIterationTypesOfIteratorWorker(type, resolver, errorNode, errorOutputContainer, noCache) {
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                let iterationTypes = getIterationTypesOfIteratorCached(type, resolver) || getIterationTypesOfIteratorFast(type, resolver);
                if (iterationTypes === noIterationTypes && errorNode) {
                    iterationTypes = void 0;
                    noCache = true;
                }
                iterationTypes != null ? iterationTypes : iterationTypes = getIterationTypesOfIteratorSlow(type, resolver, errorNode, errorOutputContainer, noCache);
                return iterationTypes === noIterationTypes ? void 0 : iterationTypes;
            }