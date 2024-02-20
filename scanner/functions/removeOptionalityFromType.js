function removeOptionalityFromType(checker, type) {
        if (!containsTypeWithFlag(type, ts.TypeFlags.Undefined))
            return type;
        const allowsNull = containsTypeWithFlag(type, ts.TypeFlags.Null);
        type = checker.getNonNullableType(type);
        return allowsNull ? checker.getNullableType(type, ts.TypeFlags.Null) : type;
    }