function checkSatisfiesExpressionWorker(expression, target, checkMode) {
                const exprType = checkExpression(expression, checkMode);
                const targetType = getTypeFromTypeNode(target);
                if (isErrorType(targetType)) {
                    return targetType;
                }
                checkTypeAssignableToAndOptionallyElaborate(exprType, targetType, target, expression, Diagnostics.Type_0_does_not_satisfy_the_expected_type_1);
                return exprType;
            }