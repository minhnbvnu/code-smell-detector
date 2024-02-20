function getContextualTypeForYieldOperand(node, contextFlags) {
                const func = getContainingFunction(node);
                if (func) {
                    const functionFlags = getFunctionFlags(func);
                    let contextualReturnType = getContextualReturnType(func, contextFlags);
                    if (contextualReturnType) {
                        const isAsyncGenerator = (functionFlags & 2 /* Async */) !== 0;
                        if (!node.asteriskToken && contextualReturnType.flags & 1048576 /* Union */) {
                            contextualReturnType = filterType(contextualReturnType, (type) => !!getIterationTypeOfGeneratorFunctionReturnType(1 /* Return */, type, isAsyncGenerator));
                        }
                        return node.asteriskToken ? contextualReturnType : getIterationTypeOfGeneratorFunctionReturnType(0 /* Yield */, contextualReturnType, isAsyncGenerator);
                    }
                }
                return void 0;
            }