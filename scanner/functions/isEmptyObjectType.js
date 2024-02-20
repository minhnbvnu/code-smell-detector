function isEmptyObjectType(type) {
        if (type_1.isObjectType(type) &&
            type.objectFlags & ts.ObjectFlags.Anonymous &&
            type.getProperties().length === 0 &&
            type.getCallSignatures().length === 0 &&
            type.getConstructSignatures().length === 0 &&
            type.getStringIndexType() === undefined &&
            type.getNumberIndexType() === undefined) {
            const baseTypes = type.getBaseTypes();
            return baseTypes === undefined || baseTypes.every(isEmptyObjectType);
        }
        return false;
    }