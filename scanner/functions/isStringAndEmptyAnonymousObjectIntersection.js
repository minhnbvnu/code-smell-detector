function isStringAndEmptyAnonymousObjectIntersection(type) {
            if (!type.isIntersection()) {
                return false;
            }
            const { types, checker } = type;
            return types.length === 2 && types[0].flags & 4 /* String */ && checker.isEmptyAnonymousObjectType(types[1]);
        }