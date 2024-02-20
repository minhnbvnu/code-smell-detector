function isIndexedAccessype(type) {
        return (type.flags & ts.TypeFlags.Index) !== 0;
    }