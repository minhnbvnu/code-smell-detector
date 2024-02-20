function getCombinedTypeFlags(types) {
                return reduceLeft(types, (flags, t) => flags | (t.flags & 1048576 /* Union */ ? getCombinedTypeFlags(t.types) : t.flags), 0);
            }