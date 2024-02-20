function isNotPropertyAccessOnIntegerLiteral(context) {
            return !isPropertyAccessExpression(context.contextNode) || !isNumericLiteral(context.contextNode.expression) || context.contextNode.expression.getText().indexOf(".") !== -1;
        }