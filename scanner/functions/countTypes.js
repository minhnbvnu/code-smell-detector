function countTypes(type) {
                return type.flags & 1048576 /* Union */ ? type.types.length : 1;
            }