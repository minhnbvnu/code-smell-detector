function createFinalArrayType(elementType) {
                return elementType.flags & 131072 /* Never */ ? autoArrayType : createArrayType(elementType.flags & 1048576 /* Union */ ? getUnionType(elementType.types, 2 /* Subtype */) : elementType);
            }