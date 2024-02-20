function isTypeReferenceType(type) {
        if ((type.flags & ObjectFlagsType) === 0) {
            return false;
        }
        const objectTypeFlags = type.objectFlags;
        return (objectTypeFlags & ts.ObjectFlags.Reference) !== 0;
    }