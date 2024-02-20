function distributeIndexOverObjectType(objectType, indexType, writing) {
                if (objectType.flags & 1048576 /* Union */ || objectType.flags & 2097152 /* Intersection */ && !shouldDeferIndexType(objectType)) {
                    const types = map(objectType.types, (t) => getSimplifiedType(getIndexedAccessType(t, indexType), writing));
                    return objectType.flags & 2097152 /* Intersection */ || writing ? getIntersectionType(types) : getUnionType(types);
                }
            }