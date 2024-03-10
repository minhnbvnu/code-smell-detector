function propertyRelatedTo(source2, target2, sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState, skipOptional) {
                    const sourcePropFlags = getDeclarationModifierFlagsFromSymbol(sourceProp);
                    const targetPropFlags = getDeclarationModifierFlagsFromSymbol(targetProp);
                    if (sourcePropFlags & 8 /* Private */ || targetPropFlags & 8 /* Private */) {
                        if (sourceProp.valueDeclaration !== targetProp.valueDeclaration) {
                            if (reportErrors2) {
                                if (sourcePropFlags & 8 /* Private */ && targetPropFlags & 8 /* Private */) {
                                    reportError(Diagnostics.Types_have_separate_declarations_of_a_private_property_0, symbolToString(targetProp));
                                }
                                else {
                                    reportError(Diagnostics.Property_0_is_private_in_type_1_but_not_in_type_2, symbolToString(targetProp), typeToString(sourcePropFlags & 8 /* Private */ ? source2 : target2), typeToString(sourcePropFlags & 8 /* Private */ ? target2 : source2));
                                }
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (targetPropFlags & 16 /* Protected */) {
                        if (!isValidOverrideOf(sourceProp, targetProp)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.Property_0_is_protected_but_type_1_is_not_a_class_derived_from_2, symbolToString(targetProp), typeToString(getDeclaringClass(sourceProp) || source2), typeToString(getDeclaringClass(targetProp) || target2));
                            }
                            return 0 /* False */;
                        }
                    }
                    else if (sourcePropFlags & 16 /* Protected */) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_protected_in_type_1_but_public_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    if (relation === strictSubtypeRelation && isReadonlySymbol(sourceProp) && !isReadonlySymbol(targetProp)) {
                        return 0 /* False */;
                    }
                    const related = isPropertySymbolTypeRelated(sourceProp, targetProp, getTypeOfSourceProperty, reportErrors2, intersectionState);
                    if (!related) {
                        if (reportErrors2) {
                            reportIncompatibleError(Diagnostics.Types_of_property_0_are_incompatible, symbolToString(targetProp));
                        }
                        return 0 /* False */;
                    }
                    if (!skipOptional && sourceProp.flags & 16777216 /* Optional */ && targetProp.flags & 106500 /* ClassMember */ && !(targetProp.flags & 16777216 /* Optional */)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.Property_0_is_optional_in_type_1_but_required_in_type_2, symbolToString(targetProp), typeToString(source2), typeToString(target2));
                        }
                        return 0 /* False */;
                    }
                    return related;
                }