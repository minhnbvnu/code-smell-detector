function reportRelationError(message, source2, target2) {
                    if (incompatibleStack)
                        reportIncompatibleStack();
                    const [sourceType, targetType] = getTypeNamesForErrorDisplay(source2, target2);
                    let generalizedSource = source2;
                    let generalizedSourceType = sourceType;
                    if (isLiteralType(source2) && !typeCouldHaveTopLevelSingletonTypes(target2)) {
                        generalizedSource = getBaseTypeOfLiteralType(source2);
                        Debug.assert(!isTypeAssignableTo(generalizedSource, target2), "generalized source shouldn't be assignable");
                        generalizedSourceType = getTypeNameForErrorDisplay(generalizedSource);
                    }
                    const targetFlags = target2.flags & 8388608 /* IndexedAccess */ && !(source2.flags & 8388608 /* IndexedAccess */) ? target2.objectType.flags : target2.flags;
                    if (targetFlags & 262144 /* TypeParameter */ && target2 !== markerSuperTypeForCheck && target2 !== markerSubTypeForCheck) {
                        const constraint = getBaseConstraintOfType(target2);
                        let needsOriginalSource;
                        if (constraint && (isTypeAssignableTo(generalizedSource, constraint) || (needsOriginalSource = isTypeAssignableTo(source2, constraint)))) {
                            reportError(Diagnostics._0_is_assignable_to_the_constraint_of_type_1_but_1_could_be_instantiated_with_a_different_subtype_of_constraint_2, needsOriginalSource ? sourceType : generalizedSourceType, targetType, typeToString(constraint));
                        }
                        else {
                            errorInfo = void 0;
                            reportError(Diagnostics._0_could_be_instantiated_with_an_arbitrary_type_which_could_be_unrelated_to_1, targetType, generalizedSourceType);
                        }
                    }
                    if (!message) {
                        if (relation === comparableRelation) {
                            message = Diagnostics.Type_0_is_not_comparable_to_type_1;
                        }
                        else if (sourceType === targetType) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_Two_different_types_with_this_name_exist_but_they_are_unrelated;
                        }
                        else if (exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                        }
                        else {
                            if (source2.flags & 128 /* StringLiteral */ && target2.flags & 1048576 /* Union */) {
                                const suggestedType = getSuggestedTypeForNonexistentStringLiteralType(source2, target2);
                                if (suggestedType) {
                                    reportError(Diagnostics.Type_0_is_not_assignable_to_type_1_Did_you_mean_2, generalizedSourceType, targetType, typeToString(suggestedType));
                                    return;
                                }
                            }
                            message = Diagnostics.Type_0_is_not_assignable_to_type_1;
                        }
                    }
                    else if (message === Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1 && exactOptionalPropertyTypes && getExactOptionalUnassignableProperties(source2, target2).length) {
                        message = Diagnostics.Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_types_of_the_target_s_properties;
                    }
                    reportError(message, generalizedSourceType, targetType);
                }