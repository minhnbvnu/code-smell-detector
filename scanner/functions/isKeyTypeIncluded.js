function isKeyTypeIncluded(keyType, include) {
                return !!(keyType.flags & include || keyType.flags & 2097152 /* Intersection */ && some(keyType.types, (t) => isKeyTypeIncluded(t, include)));
            }