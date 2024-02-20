function checkSatisfiesExpression(node) {
                checkSourceElement(node.type);
                return checkSatisfiesExpressionWorker(node.expression, node.type);
            }