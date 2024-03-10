function removeSubtypes(types, hasObjectTypes) {
                var _a2;
                if (types.length < 2) {
                    return types;
                }
                const id = getTypeListId(types);
                const match = subtypeReductionCache.get(id);
                if (match) {
                    return match;
                }
                const hasEmptyObject = hasObjectTypes && some(types, (t) => !!(t.flags & 524288 /* Object */) && !isGenericMappedType(t) && isEmptyResolvedType(resolveStructuredTypeMembers(t)));
                const len = types.length;
                let i = len;
                let count = 0;
                while (i > 0) {
                    i--;
                    const source = types[i];
                    if (hasEmptyObject || source.flags & 469499904 /* StructuredOrInstantiable */) {
                        if (source.flags & 262144 /* TypeParameter */ && getBaseConstraintOrType(source).flags & 1048576 /* Union */) {
                            if (isTypeRelatedTo(source, getUnionType(map(types, (t) => t === source ? neverType : t)), strictSubtypeRelation)) {
                                orderedRemoveItemAt(types, i);
                            }
                            continue;
                        }
                        const keyProperty = source.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 58982400 /* InstantiableNonPrimitive */) ? find(getPropertiesOfType(source), (p) => isUnitType(getTypeOfSymbol(p))) : void 0;
                        const keyPropertyType = keyProperty && getRegularTypeOfLiteralType(getTypeOfSymbol(keyProperty));
                        for (const target of types) {
                            if (source !== target) {
                                if (count === 1e5) {
                                    const estimatedCount = count / (len - i) * len;
                                    if (estimatedCount > 1e6) {
                                        (_a2 = tracing) == null ? void 0 : _a2.instant(tracing.Phase.CheckTypes, "removeSubtypes_DepthLimit", { typeIds: types.map((t) => t.id) });
                                        error(currentNode, Diagnostics.Expression_produces_a_union_type_that_is_too_complex_to_represent);
                                        return void 0;
                                    }
                                }
                                count++;
                                if (keyProperty && target.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 58982400 /* InstantiableNonPrimitive */)) {
                                    const t = getTypeOfPropertyOfType(target, keyProperty.escapedName);
                                    if (t && isUnitType(t) && getRegularTypeOfLiteralType(t) !== keyPropertyType) {
                                        continue;
                                    }
                                }
                                if (isTypeRelatedTo(source, target, strictSubtypeRelation) && (!(getObjectFlags(getTargetType(source)) & 1 /* Class */) || !(getObjectFlags(getTargetType(target)) & 1 /* Class */) || isTypeDerivedFrom(source, target))) {
                                    orderedRemoveItemAt(types, i);
                                    break;
                                }
                            }
                        }
                    }
                }
                subtypeReductionCache.set(id, types);
                return types;
            }