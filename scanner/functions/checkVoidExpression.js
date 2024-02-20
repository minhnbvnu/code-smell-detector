function checkVoidExpression(node) {
                checkExpression(node.expression);
                return undefinedWideningType;
            }