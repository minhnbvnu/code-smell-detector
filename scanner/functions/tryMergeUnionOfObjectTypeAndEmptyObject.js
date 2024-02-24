function tryMergeUnionOfObjectTypeAndEmptyObject(type, readonly) {
                if (!(type.flags & 1048576 /* Union */)) {
                    return type;
                }
                if (every(type.types, isEmptyObjectTypeOrSpreadsIntoEmptyObject)) {
                    return find(type.types, isEmptyObjectType) || emptyObjectType;
                }
                const firstType = find(type.types, (t) => !isEmptyObjectTypeOrSpreadsIntoEmptyObject(t));
                if (!firstType) {
                    return type;
                }
                const secondType = find(type.types, (t) => t !== firstType && !isEmptyObjectTypeOrSpreadsIntoEmptyObject(t));
                if (secondType) {
                    return type;
                }
                return getAnonymousPartialType(firstType);
                function getAnonymousPartialType(type2) {
                    const members = createSymbolTable();
                    for (const prop of getPropertiesOfType(type2)) {
                        if (getDeclarationModifierFlagsFromSymbol(prop) & (8 /* Private */ | 16 /* Protected */)) {
                        }
                        else if (isSpreadableProperty(prop)) {
                            const isSetonlyAccessor = prop.flags & 65536 /* SetAccessor */ && !(prop.flags & 32768 /* GetAccessor */);
                            const flags = 4 /* Property */ | 16777216 /* Optional */;
                            const result = createSymbol(flags, prop.escapedName, getIsLateCheckFlag(prop) | (readonly ? 8 /* Readonly */ : 0));
                            result.links.type = isSetonlyAccessor ? undefinedType : addOptionality(getTypeOfSymbol(prop), 
                            /*isProperty*/
                            true);
                            result.declarations = prop.declarations;
                            result.links.nameType = getSymbolLinks(prop).nameType;
                            result.links.syntheticOrigin = prop;
                            members.set(prop.escapedName, result);
                        }
                    }
                    const spread = createAnonymousType(type2.symbol, members, emptyArray, emptyArray, getIndexInfosOfType(type2));
                    spread.objectFlags |= 128 /* ObjectLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                    return spread;
                }
            }