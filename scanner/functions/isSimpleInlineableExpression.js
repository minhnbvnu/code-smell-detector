function isSimpleInlineableExpression(expression) {
            return !isIdentifier(expression) && isSimpleCopiableExpression(expression);
        }