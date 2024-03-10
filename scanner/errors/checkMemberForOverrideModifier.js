function checkMemberForOverrideModifier(node, staticType, baseStaticType, baseWithThis, type, typeWithThis, memberHasOverrideModifier, memberHasAbstractModifier, memberIsStatic, memberIsParameterProperty, memberName, errorNode) {
                const isJs = isInJSFile(node);
                const nodeInAmbientContext = !!(node.flags & 16777216 /* Ambient */);
                if (baseWithThis && (memberHasOverrideModifier || compilerOptions.noImplicitOverride)) {
                    const memberEscapedName = escapeLeadingUnderscores(memberName);
                    const thisType = memberIsStatic ? staticType : typeWithThis;
                    const baseType = memberIsStatic ? baseStaticType : baseWithThis;
                    const prop = getPropertyOfType(thisType, memberEscapedName);
                    const baseProp = getPropertyOfType(baseType, memberEscapedName);
                    const baseClassName = typeToString(baseWithThis);
                    if (prop && !baseProp && memberHasOverrideModifier) {
                        if (errorNode) {
                            const suggestion = getSuggestedSymbolForNonexistentClassMember(memberName, baseType);
                            suggestion ? error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1 : Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0_Did_you_mean_1, baseClassName, symbolToString(suggestion)) : error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0 : Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0, baseClassName);
                        }
                        return 2 /* HasInvalidOverride */;
                    }
                    else if (prop && (baseProp == null ? void 0 : baseProp.declarations) && compilerOptions.noImplicitOverride && !nodeInAmbientContext) {
                        const baseHasAbstract = some(baseProp.declarations, hasAbstractModifier);
                        if (memberHasOverrideModifier) {
                            return 0 /* Ok */;
                        }
                        if (!baseHasAbstract) {
                            if (errorNode) {
                                const diag2 = memberIsParameterProperty ? isJs ? Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0 : Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0 : isJs ? Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0 : Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0;
                                error(errorNode, diag2, baseClassName);
                            }
                            return 1 /* NeedsOverride */;
                        }
                        else if (memberHasAbstractModifier && baseHasAbstract) {
                            if (errorNode) {
                                error(errorNode, Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0, baseClassName);
                            }
                            return 1 /* NeedsOverride */;
                        }
                    }
                }
                else if (memberHasOverrideModifier) {
                    if (errorNode) {
                        const className = typeToString(type);
                        error(errorNode, isJs ? Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class : Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class, className);
                    }
                    return 2 /* HasInvalidOverride */;
                }
                return 0 /* Ok */;
            }