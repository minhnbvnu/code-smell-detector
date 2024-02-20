function unwrapReturnType(returnType, functionFlags) {
                const isGenerator = !!(functionFlags & 1 /* Generator */);
                const isAsync = !!(functionFlags & 2 /* Async */);
                if (isGenerator) {
                    const returnIterationType = getIterationTypeOfGeneratorFunctionReturnType(1 /* Return */, returnType, isAsync);
                    if (!returnIterationType) {
                        return errorType;
                    }
                    return isAsync ? getAwaitedTypeNoAlias(unwrapAwaitedType(returnIterationType)) : returnIterationType;
                }
                return isAsync ? getAwaitedTypeNoAlias(returnType) || errorType : returnType;
            }