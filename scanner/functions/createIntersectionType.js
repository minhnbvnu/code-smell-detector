function createIntersectionType(types, aliasSymbol, aliasTypeArguments) {
                const result = createType(2097152 /* Intersection */);
                result.objectFlags = getPropagatingFlagsOfTypes(types, 
                /*excludeKinds*/
                98304 /* Nullable */);
                result.types = types;
                result.aliasSymbol = aliasSymbol;
                result.aliasTypeArguments = aliasTypeArguments;
                return result;
            }