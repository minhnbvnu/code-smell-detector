function unionTypeParts(type) {
        return type_1.isUnionType(type) ? type.types : [type];
    }