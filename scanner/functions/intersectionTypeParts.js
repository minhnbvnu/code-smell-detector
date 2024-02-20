function intersectionTypeParts(type) {
        return type_1.isIntersectionType(type) ? type.types : [type];
    }