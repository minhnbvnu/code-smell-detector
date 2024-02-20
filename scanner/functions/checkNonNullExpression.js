function checkNonNullExpression(node) {
                return checkNonNullType(checkExpression(node), node);
            }