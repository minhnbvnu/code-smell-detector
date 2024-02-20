function getGlobalNonNullableTypeInstantiation(type) {
                if (!deferredGlobalNonNullableTypeAlias) {
                    deferredGlobalNonNullableTypeAlias = getGlobalSymbol("NonNullable", 524288 /* TypeAlias */, 
                    /*diagnostic*/
                    void 0) || unknownSymbol;
                }
                return deferredGlobalNonNullableTypeAlias !== unknownSymbol ? getTypeAliasInstantiation(deferredGlobalNonNullableTypeAlias, [type]) : getIntersectionType([type, emptyObjectType]);
            }