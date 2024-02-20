function isOptionalChainingUndefinedMarkerType(checker, t) {
        return util_1.isTypeFlagSet(t, ts.TypeFlags.Undefined) && checker.getNullableType(t.getNonNullableType(), ts.TypeFlags.Undefined) !== t;
    }