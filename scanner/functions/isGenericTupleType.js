function isGenericTupleType(type) {
                return isTupleType(type) && !!(type.target.combinedFlags & 8 /* Variadic */);
            }