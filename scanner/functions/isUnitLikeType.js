function isUnitLikeType(type) {
                const t = getBaseConstraintOrType(type);
                return t.flags & 2097152 /* Intersection */ ? some(t.types, isUnitType) : isUnitType(t);
            }