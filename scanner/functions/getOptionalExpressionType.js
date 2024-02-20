function getOptionalExpressionType(exprType, expression) {
                return isExpressionOfOptionalChainRoot(expression) ? getNonNullableType(exprType) : isOptionalChain(expression) ? removeOptionalTypeMarker(exprType) : exprType;
            }