function isGenericTypeWithoutNullableConstraint(type) {
                return type.flags & 2097152 /* Intersection */ ? some(type.types, isGenericTypeWithoutNullableConstraint) : !!(type.flags & 465829888 /* Instantiable */ && !maybeTypeOfKind(getBaseConstraintOrType(type), 98304 /* Nullable */));
            }