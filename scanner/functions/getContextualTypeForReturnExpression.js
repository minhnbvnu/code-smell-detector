function getContextualTypeForReturnExpression(node, contextFlags) {
                const func = getContainingFunction(node);
                if (func) {
                    let contextualReturnType = getContextualReturnType(func, contextFlags);
                    if (contextualReturnType) {
                        const functionFlags = getFunctionFlags(func);
                        if (functionFlags & 1 /* Generator */) {
                            const isAsyncGenerator = (functionFlags & 2 /* Async */) !== 0;
                            if (contextualReturnType.flags & 1048576 /* Union */) {
                                contextualReturnType = filterType(contextualReturnType, (type) => !!getIterationTypeOfGeneratorFunctionReturnType(1 /* Return */, type, isAsyncGenerator));
                            }
                            const iterationReturnType = getIterationTypeOfGeneratorFunctionReturnType(1 /* Return */, contextualReturnType, (functionFlags & 2 /* Async */) !== 0);
                            if (!iterationReturnType) {
                                return void 0;
                            }
                            contextualReturnType = iterationReturnType;
                        }
                        if (functionFlags & 2 /* Async */) {
                            const contextualAwaitedType = mapType(contextualReturnType, getAwaitedTypeNoAlias);
                            return contextualAwaitedType && getUnionType([contextualAwaitedType, createPromiseLikeType(contextualAwaitedType)]);
                        }
                        return contextualReturnType;
                    }
                }
                return void 0;
            }