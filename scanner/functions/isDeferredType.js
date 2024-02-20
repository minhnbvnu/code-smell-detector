function isDeferredType(type, checkTuples) {
                return isGenericType(type) || checkTuples && isTupleType(type) && some(getTypeArguments(type), isGenericType);
            }