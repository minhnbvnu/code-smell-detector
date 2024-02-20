function createTypeFromGenericGlobalType(genericGlobalType, typeArguments) {
                return genericGlobalType !== emptyGenericType ? createTypeReference(genericGlobalType, typeArguments) : emptyObjectType;
            }