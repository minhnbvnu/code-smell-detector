function getIterationTypesOfGeneratorFunctionReturnType(type, isAsyncGenerator) {
                if (isTypeAny(type)) {
                    return anyIterationTypes;
                }
                const use = isAsyncGenerator ? 2 /* AsyncGeneratorReturnType */ : 1 /* GeneratorReturnType */;
                const resolver = isAsyncGenerator ? asyncIterationTypesResolver : syncIterationTypesResolver;
                return getIterationTypesOfIterable(type, use, 
                /*errorNode*/
                void 0) || getIterationTypesOfIterator(type, resolver, 
                /*errorNode*/
                void 0, 
                /*errorOutputContainer*/
                void 0);
            }