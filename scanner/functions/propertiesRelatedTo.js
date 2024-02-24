function propertiesRelatedTo(source2, target2, reportErrors2, excludedProperties, optionalsOnly, intersectionState) {
                    if (relation === identityRelation) {
                        return propertiesIdenticalTo(source2, target2, excludedProperties);
                    }
                    let result2 = -1 /* True */;
                    if (isTupleType(target2)) {
                        if (isArrayOrTupleType(source2)) {
                            if (!target2.target.readonly && (isReadonlyArrayType(source2) || isTupleType(source2) && source2.target.readonly)) {
                                return 0 /* False */;
                            }
                            const sourceArity = getTypeReferenceArity(source2);
                            const targetArity = getTypeReferenceArity(target2);
                            const sourceRestFlag = isTupleType(source2) ? source2.target.combinedFlags & 4 /* Rest */ : 4 /* Rest */;
                            const targetRestFlag = target2.target.combinedFlags & 4 /* Rest */;
                            const sourceMinLength = isTupleType(source2) ? source2.target.minLength : 0;
                            const targetMinLength = target2.target.minLength;
                            if (!sourceRestFlag && sourceArity < targetMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_requires_1, sourceArity, targetMinLength);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && targetArity < sourceMinLength) {
                                if (reportErrors2) {
                                    reportError(Diagnostics.Source_has_0_element_s_but_target_allows_only_1, sourceMinLength, targetArity);
                                }
                                return 0 /* False */;
                            }
                            if (!targetRestFlag && (sourceRestFlag || targetArity < sourceArity)) {
                                if (reportErrors2) {
                                    if (sourceMinLength < targetMinLength) {
                                        reportError(Diagnostics.Target_requires_0_element_s_but_source_may_have_fewer, targetMinLength);
                                    }
                                    else {
                                        reportError(Diagnostics.Target_allows_only_0_element_s_but_source_may_have_more, targetArity);
                                    }
                                }
                                return 0 /* False */;
                            }
                            const sourceTypeArguments = getTypeArguments(source2);
                            const targetTypeArguments = getTypeArguments(target2);
                            const targetStartCount = getStartElementCount(target2.target, 11 /* NonRest */);
                            const targetEndCount = getEndElementCount(target2.target, 11 /* NonRest */);
                            const targetHasRestElement = target2.target.hasRestElement;
                            let canExcludeDiscriminants = !!excludedProperties;
                            for (let sourcePosition = 0; sourcePosition < sourceArity; sourcePosition++) {
                                const sourceFlags = isTupleType(source2) ? source2.target.elementFlags[sourcePosition] : 4 /* Rest */;
                                const sourcePositionFromEnd = sourceArity - 1 - sourcePosition;
                                const targetPosition = targetHasRestElement && sourcePosition >= targetStartCount ? targetArity - 1 - Math.min(sourcePositionFromEnd, targetEndCount) : sourcePosition;
                                const targetFlags = target2.target.elementFlags[targetPosition];
                                if (targetFlags & 8 /* Variadic */ && !(sourceFlags & 8 /* Variadic */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_variadic_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (sourceFlags & 8 /* Variadic */ && !(targetFlags & 12 /* Variable */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Variadic_element_at_position_0_in_source_does_not_match_element_at_position_1_in_target, sourcePosition, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (targetFlags & 1 /* Required */ && !(sourceFlags & 1 /* Required */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Source_provides_no_match_for_required_element_at_position_0_in_target, targetPosition);
                                    }
                                    return 0 /* False */;
                                }
                                if (canExcludeDiscriminants) {
                                    if (sourceFlags & 12 /* Variable */ || targetFlags & 12 /* Variable */) {
                                        canExcludeDiscriminants = false;
                                    }
                                    if (canExcludeDiscriminants && (excludedProperties == null ? void 0 : excludedProperties.has("" + sourcePosition))) {
                                        continue;
                                    }
                                }
                                const sourceType = removeMissingType(sourceTypeArguments[sourcePosition], !!(sourceFlags & targetFlags & 2 /* Optional */));
                                const targetType = targetTypeArguments[targetPosition];
                                const targetCheckType = sourceFlags & 8 /* Variadic */ && targetFlags & 4 /* Rest */ ? createArrayType(targetType) : removeMissingType(targetType, !!(targetFlags & 2 /* Optional */));
                                const related = isRelatedTo(sourceType, targetCheckType, 3 /* Both */, reportErrors2, 
                                /*headMessage*/
                                void 0, intersectionState);
                                if (!related) {
                                    if (reportErrors2 && (targetArity > 1 || sourceArity > 1)) {
                                        if (targetHasRestElement && sourcePosition >= targetStartCount && sourcePositionFromEnd >= targetEndCount && targetStartCount !== sourceArity - targetEndCount - 1) {
                                            reportIncompatibleError(Diagnostics.Type_at_positions_0_through_1_in_source_is_not_compatible_with_type_at_position_2_in_target, targetStartCount, sourceArity - targetEndCount - 1, targetPosition);
                                        }
                                        else {
                                            reportIncompatibleError(Diagnostics.Type_at_position_0_in_source_is_not_compatible_with_type_at_position_1_in_target, sourcePosition, targetPosition);
                                        }
                                    }
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                            return result2;
                        }
                        if (target2.target.combinedFlags & 12 /* Variable */) {
                            return 0 /* False */;
                        }
                    }
                    const requireOptionalProperties = (relation === subtypeRelation || relation === strictSubtypeRelation) && !isObjectLiteralType2(source2) && !isEmptyArrayLiteralType(source2) && !isTupleType(source2);
                    const unmatchedProperty = getUnmatchedProperty(source2, target2, requireOptionalProperties, 
                    /*matchDiscriminantProperties*/
                    false);
                    if (unmatchedProperty) {
                        if (reportErrors2 && shouldReportUnmatchedPropertyError(source2, target2)) {
                            reportUnmatchedProperty(source2, target2, unmatchedProperty, requireOptionalProperties);
                        }
                        return 0 /* False */;
                    }
                    if (isObjectLiteralType2(target2)) {
                        for (const sourceProp of excludeProperties(getPropertiesOfType(source2), excludedProperties)) {
                            if (!getPropertyOfObjectType(target2, sourceProp.escapedName)) {
                                const sourceType = getTypeOfSymbol(sourceProp);
                                if (!(sourceType.flags & 32768 /* Undefined */)) {
                                    if (reportErrors2) {
                                        reportError(Diagnostics.Property_0_does_not_exist_on_type_1, symbolToString(sourceProp), typeToString(target2));
                                    }
                                    return 0 /* False */;
                                }
                            }
                        }
                    }
                    const properties = getPropertiesOfType(target2);
                    const numericNamesOnly = isTupleType(source2) && isTupleType(target2);
                    for (const targetProp of excludeProperties(properties, excludedProperties)) {
                        const name = targetProp.escapedName;
                        if (!(targetProp.flags & 4194304 /* Prototype */) && (!numericNamesOnly || isNumericLiteralName(name) || name === "length") && (!optionalsOnly || targetProp.flags & 16777216 /* Optional */)) {
                            const sourceProp = getPropertyOfType(source2, name);
                            if (sourceProp && sourceProp !== targetProp) {
                                const related = propertyRelatedTo(source2, target2, sourceProp, targetProp, getNonMissingTypeOfSymbol, reportErrors2, intersectionState, relation === comparableRelation);
                                if (!related) {
                                    return 0 /* False */;
                                }
                                result2 &= related;
                            }
                        }
                    }
                    return result2;
                }