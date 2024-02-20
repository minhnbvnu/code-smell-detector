function isFalsyType(type) {
        if (type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Void))
            return true;
        if (type_1.isLiteralType(type))
            return !type.value;
        return isBooleanLiteralType(type, false);
    }