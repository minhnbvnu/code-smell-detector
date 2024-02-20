function isIntersectionEmpty(type1, type2) {
                return !!(getUnionType([intersectTypes(type1, type2), neverType]).flags & 131072 /* Never */);
            }