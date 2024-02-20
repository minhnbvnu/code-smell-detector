function tryCreateTypeReference(target, typeArguments) {
                if (some(typeArguments) && target === emptyGenericType) {
                    return unknownType;
                }
                return createTypeReference(target, typeArguments);
            }