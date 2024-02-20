function getIndexedAccessType(objectType, indexType, accessFlags = 0 /* None */, accessNode, aliasSymbol, aliasTypeArguments) {
                return getIndexedAccessTypeOrUndefined(objectType, indexType, accessFlags, accessNode, aliasSymbol, aliasTypeArguments) || (accessNode ? errorType : unknownType);
            }