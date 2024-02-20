function distributeObjectOverIndexType(objectType, indexType, writing) {
                if (indexType.flags & 1048576 /* Union */) {
                    const types = map(indexType.types, (t) => getSimplifiedType(getIndexedAccessType(objectType, t), writing));
                    return writing ? getIntersectionType(types) : getUnionType(types);
                }
            }