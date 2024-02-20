function getReducedUnionType(unionType) {
                const reducedTypes = sameMap(unionType.types, getReducedType);
                if (reducedTypes === unionType.types) {
                    return unionType;
                }
                const reduced = getUnionType(reducedTypes);
                if (reduced.flags & 1048576 /* Union */) {
                    reduced.resolvedReducedType = reduced;
                }
                return reduced;
            }