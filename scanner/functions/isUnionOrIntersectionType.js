function isUnionOrIntersectionType(type) {
        return (type.flags & ts.TypeFlags.UnionOrIntersection) !== 0;
    }