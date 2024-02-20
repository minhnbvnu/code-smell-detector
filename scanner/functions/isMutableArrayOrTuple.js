function isMutableArrayOrTuple(type) {
                return isArrayType(type) && !isReadonlyArrayType(type) || isTupleType(type) && !type.target.readonly;
            }