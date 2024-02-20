function createFunctionType(typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount, flags) {
                const signature = createCallSignature(typeParameters, thisParameter, parameters, returnType, typePredicate, minArgumentCount, flags);
                return getOrCreateTypeFromSignature(signature);
            }