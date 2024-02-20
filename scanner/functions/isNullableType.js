function isNullableType(type, { isReceiver = false, allowUndefined = true, } = {}) {
        const flags = (0, typeFlagUtils_1.getTypeFlags)(type);
        if (isReceiver && flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
            return true;
        }
        if (allowUndefined) {
            return (flags & (ts.TypeFlags.Null | ts.TypeFlags.Undefined)) !== 0;
        }
        else {
            return (flags & ts.TypeFlags.Null) !== 0;
        }
    }