function checkInstanceOfExpression(left, right, leftType, rightType) {
                if (leftType === silentNeverType || rightType === silentNeverType) {
                    return silentNeverType;
                }
                if (!isTypeAny(leftType) && allTypesAssignableToKind(leftType, 134348796 /* Primitive */)) {
                    error(left, Diagnostics.The_left_hand_side_of_an_instanceof_expression_must_be_of_type_any_an_object_type_or_a_type_parameter);
                }
                if (!(isTypeAny(rightType) || typeHasCallOrConstructSignatures(rightType) || isTypeSubtypeOf(rightType, globalFunctionType))) {
                    error(right, Diagnostics.The_right_hand_side_of_an_instanceof_expression_must_be_of_type_any_or_of_a_type_assignable_to_the_Function_interface_type);
                }
                return booleanType;
            }