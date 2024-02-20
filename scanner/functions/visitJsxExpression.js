function visitJsxExpression(node) {
                const expression = visitNode(node.expression, visitor, isExpression);
                return node.dotDotDotToken ? factory2.createSpreadElement(expression) : expression;
            }