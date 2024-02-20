function finalizeEvolvingArrayType(type) {
                return getObjectFlags(type) & 256 /* EvolvingArray */ ? getFinalArrayType(type) : type;
            }