function getRegularTypeOfExpression(expr) {
                if (isRightSideOfQualifiedNameOrPropertyAccess(expr)) {
                    expr = expr.parent;
                }
                return getRegularTypeOfLiteralType(getTypeOfExpression(expr));
            }