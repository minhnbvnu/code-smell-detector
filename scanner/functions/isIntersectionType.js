function isIntersectionType(type) {
        return (type.flags & ts.TypeFlags.Intersection) !== 0;
    }