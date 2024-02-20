function checkPostfixUnaryExpression(node) {
                const operandType = checkExpression(node.operand);
                if (operandType === silentNeverType) {
                    return silentNeverType;
                }
                const ok = checkArithmeticOperandType(node.operand, checkNonNullType(operandType, node.operand), Diagnostics.An_arithmetic_operand_must_be_of_type_any_number_bigint_or_an_enum_type);
                if (ok) {
                    checkReferenceExpression(node.operand, Diagnostics.The_operand_of_an_increment_or_decrement_operator_must_be_a_variable_or_a_property_access, Diagnostics.The_operand_of_an_increment_or_decrement_operator_may_not_be_an_optional_property_access);
                }
                return getUnaryResultType(operandType);
            }