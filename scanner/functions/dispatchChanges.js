function dispatchChanges(changeTracker, context, errorCode, pos) {
            switch (errorCode) {
                case Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_a_member_in_the_base_class_0.code:
                case Diagnostics.This_member_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code:
                case Diagnostics.This_member_must_have_an_override_modifier_because_it_overrides_an_abstract_method_that_is_declared_in_the_base_class_0.code:
                case Diagnostics.This_parameter_property_must_have_an_override_modifier_because_it_overrides_a_member_in_base_class_0.code:
                case Diagnostics.This_parameter_property_must_have_a_JSDoc_comment_with_an_override_tag_because_it_overrides_a_member_in_the_base_class_0.code:
                    return doAddOverrideModifierChange(changeTracker, context.sourceFile, pos);
                case Diagnostics.This_member_cannot_have_an_override_modifier_because_it_is_not_declared_in_the_base_class_0.code:
                case Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_it_is_not_declared_in_the_base_class_0.code:
                case Diagnostics.This_member_cannot_have_an_override_modifier_because_its_containing_class_0_does_not_extend_another_class.code:
                case Diagnostics.This_member_cannot_have_a_JSDoc_comment_with_an_override_tag_because_its_containing_class_0_does_not_extend_another_class.code:
                    return doRemoveOverrideModifierChange(changeTracker, context.sourceFile, pos);
                default:
                    Debug.fail("Unexpected error code: " + errorCode);
            }
        }