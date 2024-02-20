function createEvolvingArrayType(elementType) {
                const result = createObjectType(256 /* EvolvingArray */);
                result.elementType = elementType;
                return result;
            }