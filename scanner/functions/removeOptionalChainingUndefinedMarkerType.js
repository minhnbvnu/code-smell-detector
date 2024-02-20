function removeOptionalChainingUndefinedMarkerType(checker, type) {
        if (!type_1.isUnionType(type))
            return isOptionalChainingUndefinedMarkerType(checker, type) ? type.getNonNullableType() : type;
        let flags = 0;
        let containsUndefinedMarker = false;
        for (const t of type.types) {
            if (isOptionalChainingUndefinedMarkerType(checker, t)) {
                containsUndefinedMarker = true;
            }
            else {
                flags |= t.flags;
            }
        }
        return containsUndefinedMarker
            ? checker.getNullableType(type.getNonNullableType(), flags)
            : type;
    }