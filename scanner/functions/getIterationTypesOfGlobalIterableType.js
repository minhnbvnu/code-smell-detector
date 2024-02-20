function getIterationTypesOfGlobalIterableType(globalType, resolver) {
                const globalIterationTypes = getIterationTypesOfIterableCached(globalType, resolver) || getIterationTypesOfIterableSlow(globalType, resolver, 
                /*errorNode*/
                void 0, 
                /*errorOutputContainer*/
                void 0, 
                /*noCache*/
                false);
                return globalIterationTypes === noIterationTypes ? defaultIterationTypes : globalIterationTypes;
            }