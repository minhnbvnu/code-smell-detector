function isSingleElementGenericTupleType(type) {
                return isGenericTupleType(type) && type.target.elementFlags.length === 1;
            }