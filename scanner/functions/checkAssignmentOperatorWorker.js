function checkAssignmentOperatorWorker() {
                        if (checkReferenceExpression(left, Diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access, Diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access)) {
                            let headMessage;
                            if (exactOptionalPropertyTypes && isPropertyAccessExpression(left) && maybeTypeOfKind(valueType, 32768 /* Undefined */)) {
                                const target = getTypeOfPropertyOfType(getTypeOfExpression(left.expression), left.name.escapedText);
                                if (isExactOptionalPropertyMismatch(valueType, target)) {
                                    headMessage = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target;
                                }
                            }
                            checkTypeAssignableToAndOptionallyElaborate(valueType, leftType, left, right, headMessage);
                        }
                    }