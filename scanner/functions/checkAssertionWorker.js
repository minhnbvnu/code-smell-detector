function checkAssertionWorker(errNode, type, expression, checkMode) {
                let exprType = checkExpression(expression, checkMode);
                if (isConstTypeReference(type)) {
                    if (!isValidConstAssertionArgument(expression)) {
                        error(expression, Diagnostics.A_const_assertions_can_only_be_applied_to_references_to_enum_members_or_string_number_boolean_array_or_object_literals);
                    }
                    return getRegularTypeOfLiteralType(exprType);
                }
                checkSourceElement(type);
                exprType = getRegularTypeOfObjectLiteral(getBaseTypeOfLiteralType(exprType));
                const targetType = getTypeFromTypeNode(type);
                if (!isErrorType(targetType)) {
                    addLazyDiagnostic(() => {
                        const widenedType = getWidenedType(exprType);
                        if (!isTypeComparableTo(targetType, widenedType)) {
                            checkTypeComparableTo(exprType, targetType, errNode, Diagnostics.Conversion_of_type_0_to_type_1_may_be_a_mistake_because_neither_type_sufficiently_overlaps_with_the_other_If_this_was_intentional_convert_the_expression_to_unknown_first);
                        }
                    });
                }
                return targetType;
            }