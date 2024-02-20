function createUnionOrIntersectionProperty(containingType, name, skipObjectFunctionPropertyAugment) {
                var _a2, _b, _c;
                let singleProp;
                let propSet;
                let indexTypes;
                const isUnion = containingType.flags & 1048576 /* Union */;
                let optionalFlag;
                let syntheticFlag = 4 /* SyntheticMethod */;
                let checkFlags = isUnion ? 0 : 8 /* Readonly */;
                let mergedInstantiations = false;
                for (const current of containingType.types) {
                    const type = getApparentType(current);
                    if (!(isErrorType(type) || type.flags & 131072 /* Never */)) {
                        const prop = getPropertyOfType(type, name, skipObjectFunctionPropertyAugment);
                        const modifiers = prop ? getDeclarationModifierFlagsFromSymbol(prop) : 0;
                        if (prop) {
                            if (prop.flags & 106500 /* ClassMember */) {
                                optionalFlag != null ? optionalFlag : optionalFlag = isUnion ? 0 /* None */ : 16777216 /* Optional */;
                                if (isUnion) {
                                    optionalFlag |= prop.flags & 16777216 /* Optional */;
                                }
                                else {
                                    optionalFlag &= prop.flags;
                                }
                            }
                            if (!singleProp) {
                                singleProp = prop;
                            }
                            else if (prop !== singleProp) {
                                const isInstantiation = (getTargetSymbol(prop) || prop) === (getTargetSymbol(singleProp) || singleProp);
                                if (isInstantiation && compareProperties2(singleProp, prop, (a, b) => a === b ? -1 /* True */ : 0 /* False */) === -1 /* True */) {
                                    mergedInstantiations = !!singleProp.parent && !!length(getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(singleProp.parent));
                                }
                                else {
                                    if (!propSet) {
                                        propSet = /* @__PURE__ */ new Map();
                                        propSet.set(getSymbolId(singleProp), singleProp);
                                    }
                                    const id = getSymbolId(prop);
                                    if (!propSet.has(id)) {
                                        propSet.set(id, prop);
                                    }
                                }
                            }
                            if (isUnion && isReadonlySymbol(prop)) {
                                checkFlags |= 8 /* Readonly */;
                            }
                            else if (!isUnion && !isReadonlySymbol(prop)) {
                                checkFlags &= ~8 /* Readonly */;
                            }
                            checkFlags |= (!(modifiers & 24 /* NonPublicAccessibilityModifier */) ? 256 /* ContainsPublic */ : 0) | (modifiers & 16 /* Protected */ ? 512 /* ContainsProtected */ : 0) | (modifiers & 8 /* Private */ ? 1024 /* ContainsPrivate */ : 0) | (modifiers & 32 /* Static */ ? 2048 /* ContainsStatic */ : 0);
                            if (!isPrototypeProperty(prop)) {
                                syntheticFlag = 2 /* SyntheticProperty */;
                            }
                        }
                        else if (isUnion) {
                            const indexInfo = !isLateBoundName(name) && getApplicableIndexInfoForName(type, name);
                            if (indexInfo) {
                                checkFlags |= 32 /* WritePartial */ | (indexInfo.isReadonly ? 8 /* Readonly */ : 0);
                                indexTypes = append(indexTypes, isTupleType(type) ? getRestTypeOfTupleType(type) || undefinedType : indexInfo.type);
                            }
                            else if (isObjectLiteralType2(type) && !(getObjectFlags(type) & 2097152 /* ContainsSpread */)) {
                                checkFlags |= 32 /* WritePartial */;
                                indexTypes = append(indexTypes, undefinedType);
                            }
                            else {
                                checkFlags |= 16 /* ReadPartial */;
                            }
                        }
                    }
                }
                if (!singleProp || isUnion && (propSet || checkFlags & 48 /* Partial */) && checkFlags & (1024 /* ContainsPrivate */ | 512 /* ContainsProtected */) && !(propSet && getCommonDeclarationsOfSymbols(propSet.values()))) {
                    return void 0;
                }
                if (!propSet && !(checkFlags & 16 /* ReadPartial */) && !indexTypes) {
                    if (mergedInstantiations) {
                        const links = (_a2 = tryCast(singleProp, isTransientSymbol)) == null ? void 0 : _a2.links;
                        const clone2 = createSymbolWithType(singleProp, links == null ? void 0 : links.type);
                        clone2.parent = (_c = (_b = singleProp.valueDeclaration) == null ? void 0 : _b.symbol) == null ? void 0 : _c.parent;
                        clone2.links.containingType = containingType;
                        clone2.links.mapper = links == null ? void 0 : links.mapper;
                        return clone2;
                    }
                    else {
                        return singleProp;
                    }
                }
                const props = propSet ? arrayFrom(propSet.values()) : [singleProp];
                let declarations;
                let firstType;
                let nameType;
                const propTypes = [];
                let writeTypes;
                let firstValueDeclaration;
                let hasNonUniformValueDeclaration = false;
                for (const prop of props) {
                    if (!firstValueDeclaration) {
                        firstValueDeclaration = prop.valueDeclaration;
                    }
                    else if (prop.valueDeclaration && prop.valueDeclaration !== firstValueDeclaration) {
                        hasNonUniformValueDeclaration = true;
                    }
                    declarations = addRange(declarations, prop.declarations);
                    const type = getTypeOfSymbol(prop);
                    if (!firstType) {
                        firstType = type;
                        nameType = getSymbolLinks(prop).nameType;
                    }
                    const writeType = getWriteTypeOfSymbol(prop);
                    if (writeTypes || writeType !== type) {
                        writeTypes = append(!writeTypes ? propTypes.slice() : writeTypes, writeType);
                    }
                    else if (type !== firstType) {
                        checkFlags |= 64 /* HasNonUniformType */;
                    }
                    if (isLiteralType(type) || isPatternLiteralType(type) || type === uniqueLiteralType) {
                        checkFlags |= 128 /* HasLiteralType */;
                    }
                    if (type.flags & 131072 /* Never */ && type !== uniqueLiteralType) {
                        checkFlags |= 131072 /* HasNeverType */;
                    }
                    propTypes.push(type);
                }
                addRange(propTypes, indexTypes);
                const result = createSymbol(4 /* Property */ | (optionalFlag != null ? optionalFlag : 0), name, syntheticFlag | checkFlags);
                result.links.containingType = containingType;
                if (!hasNonUniformValueDeclaration && firstValueDeclaration) {
                    result.valueDeclaration = firstValueDeclaration;
                    if (firstValueDeclaration.symbol.parent) {
                        result.parent = firstValueDeclaration.symbol.parent;
                    }
                }
                result.declarations = declarations;
                result.links.nameType = nameType;
                if (propTypes.length > 2) {
                    result.links.checkFlags |= 65536 /* DeferredType */;
                    result.links.deferralParent = containingType;
                    result.links.deferralConstituents = propTypes;
                    result.links.deferralWriteConstituents = writeTypes;
                }
                else {
                    result.links.type = isUnion ? getUnionType(propTypes) : getIntersectionType(propTypes);
                    if (writeTypes) {
                        result.links.writeType = isUnion ? getUnionType(writeTypes) : getIntersectionType(writeTypes);
                    }
                }
                return result;
            }