function addMemberForKeyTypeWorker(keyType, propNameType) {
                    if (isTypeUsableAsPropertyName(propNameType)) {
                        const propName = getPropertyNameFromType(propNameType);
                        const existingProp = members.get(propName);
                        if (existingProp) {
                            existingProp.links.nameType = getUnionType([existingProp.links.nameType, propNameType]);
                            existingProp.links.keyType = getUnionType([existingProp.links.keyType, keyType]);
                        }
                        else {
                            const modifiersProp = isTypeUsableAsPropertyName(keyType) ? getPropertyOfType(modifiersType, getPropertyNameFromType(keyType)) : void 0;
                            const isOptional = !!(templateModifiers & 4 /* IncludeOptional */ || !(templateModifiers & 8 /* ExcludeOptional */) && modifiersProp && modifiersProp.flags & 16777216 /* Optional */);
                            const isReadonly = !!(templateModifiers & 1 /* IncludeReadonly */ || !(templateModifiers & 2 /* ExcludeReadonly */) && modifiersProp && isReadonlySymbol(modifiersProp));
                            const stripOptional = strictNullChecks && !isOptional && modifiersProp && modifiersProp.flags & 16777216 /* Optional */;
                            const lateFlag = modifiersProp ? getIsLateCheckFlag(modifiersProp) : 0;
                            const prop = createSymbol(4 /* Property */ | (isOptional ? 16777216 /* Optional */ : 0), propName, lateFlag | 262144 /* Mapped */ | (isReadonly ? 8 /* Readonly */ : 0) | (stripOptional ? 524288 /* StripOptional */ : 0));
                            prop.links.mappedType = type;
                            prop.links.nameType = propNameType;
                            prop.links.keyType = keyType;
                            if (modifiersProp) {
                                prop.links.syntheticOrigin = modifiersProp;
                                prop.declarations = shouldLinkPropDeclarations ? modifiersProp.declarations : void 0;
                            }
                            members.set(propName, prop);
                        }
                    }
                    else if (isValidIndexKeyType(propNameType) || propNameType.flags & (1 /* Any */ | 32 /* Enum */)) {
                        const indexKeyType = propNameType.flags & (1 /* Any */ | 4 /* String */) ? stringType : propNameType.flags & (8 /* Number */ | 32 /* Enum */) ? numberType : propNameType;
                        const propType = instantiateType(templateType, appendTypeMapping(type.mapper, typeParameter, keyType));
                        const indexInfo = createIndexInfo(indexKeyType, propType, !!(templateModifiers & 1 /* IncludeReadonly */));
                        indexInfos = appendIndexInfo(indexInfos, indexInfo, 
                        /*union*/
                        true);
                    }
                }