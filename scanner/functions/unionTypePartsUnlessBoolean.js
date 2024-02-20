function unionTypePartsUnlessBoolean(type) {
        return type.isUnion() &&
            type.types.length === 2 &&
            tsutils.isBooleanLiteralType(type.types[0], false) &&
            tsutils.isBooleanLiteralType(type.types[1], true)
            ? [type]
            : tsutils.unionTypeParts(type);
    }