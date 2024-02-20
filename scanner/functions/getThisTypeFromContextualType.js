function getThisTypeFromContextualType(type) {
                return mapType(type, (t) => {
                    return t.flags & 2097152 /* Intersection */ ? forEach(t.types, getThisTypeArgument) : getThisTypeArgument(t);
                });
            }