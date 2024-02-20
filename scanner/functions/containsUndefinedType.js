function containsUndefinedType(type) {
                return !!((type.flags & 1048576 /* Union */ ? type.types[0] : type).flags & 32768 /* Undefined */);
            }