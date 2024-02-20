function expandUnionOrIntersectionType(type) {
        if (type.isUnionOrIntersection()) {
            return type.types.flatMap(expandUnionOrIntersectionType);
        }
        return [type];
    }