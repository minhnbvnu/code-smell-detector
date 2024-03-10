function createNormalizedTupleType(target, elementTypes) {
                var _a2, _b, _c;
                if (!(target.combinedFlags & 14 /* NonRequired */)) {
                    return createTypeReference(target, elementTypes);
                }
                if (target.combinedFlags & 8 /* Variadic */) {
                    const unionIndex = findIndex(elementTypes, (t, i) => !!(target.elementFlags[i] & 8 /* Variadic */ && t.flags & (131072 /* Never */ | 1048576 /* Union */)));
                    if (unionIndex >= 0) {
                        return checkCrossProductUnion(map(elementTypes, (t, i) => target.elementFlags[i] & 8 /* Variadic */ ? t : unknownType)) ? mapType(elementTypes[unionIndex], (t) => createNormalizedTupleType(target, replaceElement(elementTypes, unionIndex, t))) : errorType;
                    }
                }
                const expandedTypes = [];
                const expandedFlags = [];
                let expandedDeclarations = [];
                let lastRequiredIndex = -1;
                let firstRestIndex = -1;
                let lastOptionalOrRestIndex = -1;
                for (let i = 0; i < elementTypes.length; i++) {
                    const type = elementTypes[i];
                    const flags = target.elementFlags[i];
                    if (flags & 8 /* Variadic */) {
                        if (type.flags & 58982400 /* InstantiableNonPrimitive */ || isGenericMappedType(type)) {
                            addElement(type, 8 /* Variadic */, (_a2 = target.labeledElementDeclarations) == null ? void 0 : _a2[i]);
                        }
                        else if (isTupleType(type)) {
                            const elements = getTypeArguments(type);
                            if (elements.length + expandedTypes.length >= 1e4) {
                                error(currentNode, isPartOfTypeNode(currentNode) ? Diagnostics.Type_produces_a_tuple_type_that_is_too_large_to_represent : Diagnostics.Expression_produces_a_tuple_type_that_is_too_large_to_represent);
                                return errorType;
                            }
                            forEach(elements, (t, n) => {
                                var _a3;
                                return addElement(t, type.target.elementFlags[n], (_a3 = type.target.labeledElementDeclarations) == null ? void 0 : _a3[n]);
                            });
                        }
                        else {
                            addElement(isArrayLikeType(type) && getIndexTypeOfType(type, numberType) || errorType, 4 /* Rest */, (_b = target.labeledElementDeclarations) == null ? void 0 : _b[i]);
                        }
                    }
                    else {
                        addElement(type, flags, (_c = target.labeledElementDeclarations) == null ? void 0 : _c[i]);
                    }
                }
                for (let i = 0; i < lastRequiredIndex; i++) {
                    if (expandedFlags[i] & 2 /* Optional */)
                        expandedFlags[i] = 1 /* Required */;
                }
                if (firstRestIndex >= 0 && firstRestIndex < lastOptionalOrRestIndex) {
                    expandedTypes[firstRestIndex] = getUnionType(sameMap(expandedTypes.slice(firstRestIndex, lastOptionalOrRestIndex + 1), (t, i) => expandedFlags[firstRestIndex + i] & 8 /* Variadic */ ? getIndexedAccessType(t, numberType) : t));
                    expandedTypes.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                    expandedFlags.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                    expandedDeclarations == null ? void 0 : expandedDeclarations.splice(firstRestIndex + 1, lastOptionalOrRestIndex - firstRestIndex);
                }
                const tupleTarget = getTupleTargetType(expandedFlags, target.readonly, expandedDeclarations);
                return tupleTarget === emptyGenericType ? emptyObjectType : expandedFlags.length ? createTypeReference(tupleTarget, expandedTypes) : tupleTarget;
                function addElement(type, flags, declaration) {
                    if (flags & 1 /* Required */) {
                        lastRequiredIndex = expandedFlags.length;
                    }
                    if (flags & 4 /* Rest */ && firstRestIndex < 0) {
                        firstRestIndex = expandedFlags.length;
                    }
                    if (flags & (2 /* Optional */ | 4 /* Rest */)) {
                        lastOptionalOrRestIndex = expandedFlags.length;
                    }
                    expandedTypes.push(flags & 2 /* Optional */ ? addOptionality(type, 
                    /*isProperty*/
                    true) : type);
                    expandedFlags.push(flags);
                    if (expandedDeclarations && declaration) {
                        expandedDeclarations.push(declaration);
                    }
                    else {
                        expandedDeclarations = void 0;
                    }
                }
            }