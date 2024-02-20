function getPropertiesOfObjectType(type) {
                if (type.flags & 524288 /* Object */) {
                    return resolveStructuredTypeMembers(type).properties;
                }
                return emptyArray;
            }