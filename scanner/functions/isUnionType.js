function isUnionType(type) {
        return (type.flags & ts.TypeFlags.Union) !== 0;
    }