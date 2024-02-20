function getCrossProductUnionSize(types) {
                return reduceLeft(types, (n, t) => t.flags & 1048576 /* Union */ ? n * t.types.length : t.flags & 131072 /* Never */ ? 0 : n, 1);
            }