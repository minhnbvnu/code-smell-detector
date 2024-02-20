function someTypePart(type, predicate, cb) {
        return predicate(type) ? type.types.some(cb) : cb(type);
    }