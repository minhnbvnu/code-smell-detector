function checkReferenceAssignment(target, sourceType, checkMode) {
                const targetType = checkExpression(target, checkMode);
                const error2 = target.parent.kind === 301 /* SpreadAssignment */ ? Diagnostics.The_target_of_an_object_rest_assignment_must_be_a_variable_or_a_property_access : Diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access;
                const optionalError = target.parent.kind === 301 /* SpreadAssignment */ ? Diagnostics.The_target_of_an_object_rest_assignment_may_not_be_an_optional_property_access : Diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access;
                if (checkReferenceExpression(target, error2, optionalError)) {
                    checkTypeAssignableToAndOptionallyElaborate(sourceType, targetType, target, target);
                }
                if (isPrivateIdentifierPropertyAccessExpression(target)) {
                    checkExternalEmitHelpers(target.parent, 1048576 /* ClassPrivateFieldSet */);
                }
                return sourceType;
            }