function containsMissingType(type) {
                return type === missingType || !!(type.flags & 1048576 /* Union */) && type.types[0] === missingType;
            }