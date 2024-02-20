function createNormalizedTypeReference(target, typeArguments) {
                return target.objectFlags & 8 /* Tuple */ ? createNormalizedTupleType(target, typeArguments) : createTypeReference(target, typeArguments);
            }