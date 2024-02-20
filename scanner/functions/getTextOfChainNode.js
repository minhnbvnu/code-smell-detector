function getTextOfChainNode(node) {
            if (isIdentifier(node) || isStringOrNumericLiteralLike(node)) {
                return node.getText();
            }
            if (isPropertyAccessExpression(node)) {
                return getTextOfChainNode(node.name);
            }
            if (isElementAccessExpression(node)) {
                return getTextOfChainNode(node.argumentExpression);
            }
            return void 0;
        }