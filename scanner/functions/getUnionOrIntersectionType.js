function getUnionOrIntersectionType(types, kind, unionReduction) {
                return kind !== 2097152 /* Intersection */ ? getUnionType(types, unionReduction) : getIntersectionType(types);
            }