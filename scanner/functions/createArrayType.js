function createArrayType(elementType, readonly) {
                return createTypeFromGenericGlobalType(readonly ? globalReadonlyArrayType : globalArrayType, [elementType]);
            }