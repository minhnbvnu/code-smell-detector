function getNormalizedUnionOrIntersectionType(type, writing) {
                const reduced = getReducedType(type);
                if (reduced !== type) {
                    return reduced;
                }
                if (type.flags & 2097152 /* Intersection */ && some(type.types, isEmptyAnonymousObjectType)) {
                    const normalizedTypes = sameMap(type.types, (t) => getNormalizedType(t, writing));
                    if (normalizedTypes !== type.types) {
                        return getIntersectionType(normalizedTypes);
                    }
                }
                return type;
            }