function isNegatedIf(node) {
                return isNegatedUnaryExpression(node.test) || isNegatedBinaryExpression(node.test);
            }