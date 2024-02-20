function getCommonSupertype(types) {
                if (types.length === 1) {
                    return types[0];
                }
                const primaryTypes = strictNullChecks ? sameMap(types, (t) => filterType(t, (u) => !(u.flags & 98304 /* Nullable */))) : types;
                const superTypeOrUnion = literalTypesWithSameBaseType(primaryTypes) ? getUnionType(primaryTypes) : reduceLeft(primaryTypes, (s, t) => isTypeSubtypeOf(s, t) ? t : s);
                return primaryTypes === types ? superTypeOrUnion : getNullableType(superTypeOrUnion, getCombinedTypeFlags(types) & 98304 /* Nullable */);
            }