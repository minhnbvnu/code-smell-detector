function everyType(type, f) {
                return type.flags & 1048576 /* Union */ ? every(type.types, f) : f(type);
            }