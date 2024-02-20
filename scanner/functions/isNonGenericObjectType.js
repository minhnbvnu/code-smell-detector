function isNonGenericObjectType(type) {
                return !!(type.flags & 524288 /* Object */) && !isGenericMappedType(type);
            }