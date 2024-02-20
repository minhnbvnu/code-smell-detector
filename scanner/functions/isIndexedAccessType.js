function isIndexedAccessType(type) {
        return (type.flags & ts.TypeFlags.IndexedAccess) !== 0;
    }