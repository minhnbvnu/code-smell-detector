function someType(type, f) {
                return type.flags & 1048576 /* Union */ ? some(type.types, f) : f(type);
            }