function isObjectType(type) {
        return (type.flags & ts.TypeFlags.Object) !== 0;
    }