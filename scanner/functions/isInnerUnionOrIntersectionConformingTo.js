function isInnerUnionOrIntersectionConformingTo(type, predicate) {
                return rec(type);
                function rec(innerType) {
                    if (innerType.isUnion()) {
                        return innerType.types.every(rec);
                    }
                    if (innerType.isIntersection()) {
                        return innerType.types.some(rec);
                    }
                    return predicate(innerType);
                }
            }