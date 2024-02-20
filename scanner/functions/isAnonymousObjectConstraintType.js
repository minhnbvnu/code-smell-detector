function isAnonymousObjectConstraintType(type) {
            return type.flags & 524288 /* Object */ && type.objectFlags === 16 /* Anonymous */;
        }