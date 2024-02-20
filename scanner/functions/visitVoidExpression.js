function visitVoidExpression(node) {
                return visitEachChild(node, visitorWithUnusedExpressionResult, context);
            }