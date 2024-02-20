function typeRelatedToDiscriminatedType(source2, target2) {
                    var _a3;
                    const sourceProperties = getPropertiesOfType(source2);
                    const sourcePropertiesFiltered = findDiscriminantProperties(sourceProperties, target2);
                    if (!sourcePropertiesFiltered)
                        return 0 /* False */;
                    let numCombinations = 1;
                    for (const sourceProperty of sourcePropertiesFiltered) {
                        numCombinations *= countTypes(getNonMissingTypeOfSymbol(sourceProperty));
                        if (numCombinations > 25) {
                            (_a3 = tracing) == null ? void 0 : _a3.instant(tracing.Phase.CheckTypes, "typeRelatedToDiscriminatedType_DepthLimit", { sourceId: source2.id, targetId: target2.id, numCombinations });
                            return 0 /* False */;
                        }
                    }
                    const sourceDiscriminantTypes = new Array(sourcePropertiesFiltered.length);
                    const excludedProperties = /* @__PURE__ */ new Set();
                    for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                        const sourceProperty = sourcePropertiesFiltered[i];
                        const sourcePropertyType = getNonMissingTypeOfSymbol(sourceProperty);
                        sourceDiscriminantTypes[i] = sourcePropertyType.flags & 1048576 /* Union */ ? sourcePropertyType.types : [sourcePropertyType];
                        excludedProperties.add(sourceProperty.escapedName);
                    }
                    const discriminantCombinations = cartesianProduct(sourceDiscriminantTypes);
                    const matchingTypes = [];
                    for (const combination of discriminantCombinations) {
                        let hasMatch = false;
                        outer: for (const type of target2.types) {
                            for (let i = 0; i < sourcePropertiesFiltered.length; i++) {
                                const sourceProperty = sourcePropertiesFiltered[i];
                                const targetProperty = getPropertyOfType(type, sourceProperty.escapedName);
                                if (!targetProperty)
                                    continue outer;
                                if (sourceProperty === targetProperty)
                                    continue;
                                const related = propertyRelatedTo(source2, target2, sourceProperty, targetProperty, (_) => combination[i], 
                                /*reportErrors*/
                                false, 0 /* None */, 
                                /*skipOptional*/
                                strictNullChecks || relation === comparableRelation);
                                if (!related) {
                                    continue outer;
                                }
                            }
                            pushIfUnique(matchingTypes, type, equateValues);
                            hasMatch = true;
                        }
                        if (!hasMatch) {
                            return 0 /* False */;
                        }
                    }
                    let result2 = -1 /* True */;
                    for (const type of matchingTypes) {
                        result2 &= propertiesRelatedTo(source2, type, 
                        /*reportErrors*/
                        false, excludedProperties, 
                        /*optionalsOnly*/
                        false, 0 /* None */);
                        if (result2) {
                            result2 &= signaturesRelatedTo(source2, type, 0 /* Call */, 
                            /*reportStructuralErrors*/
                            false, 0 /* None */);
                            if (result2) {
                                result2 &= signaturesRelatedTo(source2, type, 1 /* Construct */, 
                                /*reportStructuralErrors*/
                                false, 0 /* None */);
                                if (result2 && !(isTupleType(source2) && isTupleType(type))) {
                                    result2 &= indexSignaturesRelatedTo(source2, type, 
                                    /*sourceIsPrimitive*/
                                    false, 
                                    /*reportStructuralErrors*/
                                    false, 0 /* None */);
                                }
                            }
                        }
                        if (!result2) {
                            return result2;
                        }
                    }
                    return result2;
                }