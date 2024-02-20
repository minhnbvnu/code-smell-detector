function resolveAnonymousTypeMembers(type) {
                if (type.target) {
                    setStructuredTypeMembers(type, emptySymbols, emptyArray, emptyArray, emptyArray);
                    const members2 = createInstantiatedSymbolTable(getPropertiesOfObjectType(type.target), type.mapper, 
                    /*mappingThisOnly*/
                    false);
                    const callSignatures = instantiateSignatures(getSignaturesOfType(type.target, 0 /* Call */), type.mapper);
                    const constructSignatures = instantiateSignatures(getSignaturesOfType(type.target, 1 /* Construct */), type.mapper);
                    const indexInfos2 = instantiateIndexInfos(getIndexInfosOfType(type.target), type.mapper);
                    setStructuredTypeMembers(type, members2, callSignatures, constructSignatures, indexInfos2);
                    return;
                }
                const symbol = getMergedSymbol(type.symbol);
                if (symbol.flags & 2048 /* TypeLiteral */) {
                    setStructuredTypeMembers(type, emptySymbols, emptyArray, emptyArray, emptyArray);
                    const members2 = getMembersOfSymbol(symbol);
                    const callSignatures = getSignaturesOfSymbol(members2.get("__call" /* Call */));
                    const constructSignatures = getSignaturesOfSymbol(members2.get("__new" /* New */));
                    const indexInfos2 = getIndexInfosOfSymbol(symbol);
                    setStructuredTypeMembers(type, members2, callSignatures, constructSignatures, indexInfos2);
                    return;
                }
                let members = emptySymbols;
                let indexInfos;
                if (symbol.exports) {
                    members = getExportsOfSymbol(symbol);
                    if (symbol === globalThisSymbol) {
                        const varsOnly = /* @__PURE__ */ new Map();
                        members.forEach((p) => {
                            var _a2;
                            if (!(p.flags & 418 /* BlockScoped */) && !(p.flags & 512 /* ValueModule */ && ((_a2 = p.declarations) == null ? void 0 : _a2.length) && every(p.declarations, isAmbientModule))) {
                                varsOnly.set(p.escapedName, p);
                            }
                        });
                        members = varsOnly;
                    }
                }
                let baseConstructorIndexInfo;
                setStructuredTypeMembers(type, members, emptyArray, emptyArray, emptyArray);
                if (symbol.flags & 32 /* Class */) {
                    const classType = getDeclaredTypeOfClassOrInterface(symbol);
                    const baseConstructorType = getBaseConstructorTypeOfClass(classType);
                    if (baseConstructorType.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 8650752 /* TypeVariable */)) {
                        members = createSymbolTable(getNamedOrIndexSignatureMembers(members));
                        addInheritedMembers(members, getPropertiesOfType(baseConstructorType));
                    }
                    else if (baseConstructorType === anyType) {
                        baseConstructorIndexInfo = createIndexInfo(stringType, anyType, 
                        /*isReadonly*/
                        false);
                    }
                }
                const indexSymbol = getIndexSymbolFromSymbolTable(members);
                if (indexSymbol) {
                    indexInfos = getIndexInfosOfIndexSymbol(indexSymbol);
                }
                else {
                    if (baseConstructorIndexInfo) {
                        indexInfos = append(indexInfos, baseConstructorIndexInfo);
                    }
                    if (symbol.flags & 384 /* Enum */ && (getDeclaredTypeOfSymbol(symbol).flags & 32 /* Enum */ || some(type.properties, (prop) => !!(getTypeOfSymbol(prop).flags & 296 /* NumberLike */)))) {
                        indexInfos = append(indexInfos, enumNumberIndexInfo);
                    }
                }
                setStructuredTypeMembers(type, members, emptyArray, emptyArray, indexInfos || emptyArray);
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */)) {
                    type.callSignatures = getSignaturesOfSymbol(symbol);
                }
                if (symbol.flags & 32 /* Class */) {
                    const classType = getDeclaredTypeOfClassOrInterface(symbol);
                    let constructSignatures = symbol.members ? getSignaturesOfSymbol(symbol.members.get("__constructor" /* Constructor */)) : emptyArray;
                    if (symbol.flags & 16 /* Function */) {
                        constructSignatures = addRange(constructSignatures.slice(), mapDefined(type.callSignatures, (sig) => isJSConstructor(sig.declaration) ? createSignature(sig.declaration, sig.typeParameters, sig.thisParameter, sig.parameters, classType, 
                        /*resolvedTypePredicate*/
                        void 0, sig.minArgumentCount, sig.flags & 39 /* PropagatingFlags */) : void 0));
                    }
                    if (!constructSignatures.length) {
                        constructSignatures = getDefaultConstructSignatures(classType);
                    }
                    type.constructSignatures = constructSignatures;
                }
            }