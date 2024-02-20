function getLiteralTypeFromProperties(type, include, includeOrigin) {
                const origin = includeOrigin && (getObjectFlags(type) & (3 /* ClassOrInterface */ | 4 /* Reference */) || type.aliasSymbol) ? createOriginIndexType(type) : void 0;
                const propertyTypes = map(getPropertiesOfType(type), (prop) => getLiteralTypeFromProperty(prop, include));
                const indexKeyTypes = map(getIndexInfosOfType(type), (info) => info !== enumNumberIndexInfo && isKeyTypeIncluded(info.keyType, include) ? info.keyType === stringType && include & 8 /* Number */ ? stringOrNumberType : info.keyType : neverType);
                return getUnionType(concatenate(propertyTypes, indexKeyTypes), 1 /* Literal */, 
                /*aliasSymbol*/
                void 0, 
                /*aliasTypeArguments*/
                void 0, origin);
            }