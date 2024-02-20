function getElementTypeOfEvolvingArrayType(type) {
                return getObjectFlags(type) & 256 /* EvolvingArray */ ? type.elementType : neverType;
            }