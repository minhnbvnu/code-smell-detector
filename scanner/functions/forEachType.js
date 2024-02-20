function forEachType(type, f) {
                return type.flags & 1048576 /* Union */ ? forEach(type.types, f) : f(type);
            }