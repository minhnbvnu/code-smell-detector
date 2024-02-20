function createIndexedAccessType(objectType, indexType, accessFlags, aliasSymbol, aliasTypeArguments) {
                const type = createType(8388608 /* IndexedAccess */);
                type.objectType = objectType;
                type.indexType = indexType;
                type.accessFlags = accessFlags;
                type.aliasSymbol = aliasSymbol;
                type.aliasTypeArguments = aliasTypeArguments;
                return type;
            }