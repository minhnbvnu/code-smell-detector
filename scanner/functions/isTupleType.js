function isTupleType(type) {
        return (type.flags & ts.TypeFlags.Object && type.objectFlags & ts.ObjectFlags.Tuple) !== 0;
    }