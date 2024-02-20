function getReturnTypeOfSingleNonGenericSignatureOfCallChain(expr) {
                const funcType = checkExpression(expr.expression);
                const nonOptionalType = getOptionalExpressionType(funcType, expr.expression);
                const returnType = getReturnTypeOfSingleNonGenericCallSignature(funcType);
                return returnType && propagateOptionalTypeMarker(returnType, expr, nonOptionalType !== funcType);
            }