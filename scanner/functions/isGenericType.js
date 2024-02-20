function isGenericType(type) {
        return (type.flags & ts.TypeFlags.Object) !== 0 &&
            (type.objectFlags & ts.ObjectFlags.ClassOrInterface) !== 0 &&
            (type.objectFlags & ts.ObjectFlags.Reference) !== 0;
    }