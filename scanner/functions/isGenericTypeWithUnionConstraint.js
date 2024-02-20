function isGenericTypeWithUnionConstraint(type) {
                return type.flags & 2097152 /* Intersection */ ? some(type.types, isGenericTypeWithUnionConstraint) : !!(type.flags & 465829888 /* Instantiable */ && getBaseConstraintOrType(type).flags & (98304 /* Nullable */ | 1048576 /* Union */));
            }