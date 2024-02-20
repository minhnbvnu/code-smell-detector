function isValidBaseType(type) {
                if (type.flags & 262144 /* TypeParameter */) {
                    const constraint = getBaseConstraintOfType(type);
                    if (constraint) {
                        return isValidBaseType(constraint);
                    }
                }
                return !!(type.flags & (524288 /* Object */ | 67108864 /* NonPrimitive */ | 1 /* Any */) && !isGenericMappedType(type) || type.flags & 2097152 /* Intersection */ && every(type.types, isValidBaseType));
            }