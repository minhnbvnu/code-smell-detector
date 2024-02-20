function mappedTypeRelatedTo(source2, target2, reportErrors2) {
                    const modifiersRelated = relation === comparableRelation || (relation === identityRelation ? getMappedTypeModifiers(source2) === getMappedTypeModifiers(target2) : getCombinedMappedTypeOptionality(source2) <= getCombinedMappedTypeOptionality(target2));
                    if (modifiersRelated) {
                        let result2;
                        const targetConstraint = getConstraintTypeFromMappedType(target2);
                        const sourceConstraint = instantiateType(getConstraintTypeFromMappedType(source2), getCombinedMappedTypeOptionality(source2) < 0 ? reportUnmeasurableMapper : reportUnreliableMapper);
                        if (result2 = isRelatedTo(targetConstraint, sourceConstraint, 3 /* Both */, reportErrors2)) {
                            const mapper = createTypeMapper([getTypeParameterFromMappedType(source2)], [getTypeParameterFromMappedType(target2)]);
                            if (instantiateType(getNameTypeFromMappedType(source2), mapper) === instantiateType(getNameTypeFromMappedType(target2), mapper)) {
                                return result2 & isRelatedTo(instantiateType(getTemplateTypeFromMappedType(source2), mapper), getTemplateTypeFromMappedType(target2), 3 /* Both */, reportErrors2);
                            }
                        }
                    }
                    return 0 /* False */;
                }