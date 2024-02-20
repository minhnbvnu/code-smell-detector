function getStatementOrExpressionRange(node) {
            if (isStatement(node)) {
                return [node];
            }
            if (isExpressionNode(node)) {
                return isExpressionStatement(node.parent) ? [node.parent] : node;
            }
            if (isStringLiteralJsxAttribute(node)) {
                return node;
            }
            return void 0;
        }