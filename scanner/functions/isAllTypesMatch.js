function isAllTypesMatch(type, cb) {
        if (type.isUnion()) {
            return type.types.every(t => cb(t));
        }
        return cb(type);
    }