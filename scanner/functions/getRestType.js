function getRestType(source, properties, symbol) {
                source = filterType(source, (t) => !(t.flags & 98304 /* Nullable */));
                if (source.flags & 131072 /* Never */) {
                    return emptyObjectType;
                }
                if (source.flags & 1048576 /* Union */) {
                    return mapType(source, (t) => getRestType(t, properties, symbol));
                }
                let omitKeyType = getUnionType(map(properties, getLiteralTypeFromPropertyName));
                const spreadableProperties = [];
                const unspreadableToRestKeys = [];
                for (const prop of getPropertiesOfType(source)) {
                    const literalTypeFromProperty = getLiteralTypeFromProperty(prop, 8576 /* StringOrNumberLiteralOrUnique */);
                    if (!isTypeAssignableTo(literalTypeFromProperty, omitKeyType) && !(getDeclarationModifierFlagsFromSymbol(prop) & (8 /* Private */ | 16 /* Protected */)) && isSpreadableProperty(prop)) {
                        spreadableProperties.push(prop);
                    }
                    else {
                        unspreadableToRestKeys.push(literalTypeFromProperty);
                    }
                }
                if (isGenericObjectType(source) || isGenericIndexType(omitKeyType)) {
                    if (unspreadableToRestKeys.length) {
                        omitKeyType = getUnionType([omitKeyType, ...unspreadableToRestKeys]);
                    }
                    if (omitKeyType.flags & 131072 /* Never */) {
                        return source;
                    }
                    const omitTypeAlias = getGlobalOmitSymbol();
                    if (!omitTypeAlias) {
                        return errorType;
                    }
                    return getTypeAliasInstantiation(omitTypeAlias, [source, omitKeyType]);
                }
                const members = createSymbolTable();
                for (const prop of spreadableProperties) {
                    members.set(prop.escapedName, getSpreadSymbol(prop, 
                    /*readonly*/
                    false));
                }
                const result = createAnonymousType(symbol, members, emptyArray, emptyArray, getIndexInfosOfType(source));
                result.objectFlags |= 4194304 /* ObjectRestType */;
                return result;
            }