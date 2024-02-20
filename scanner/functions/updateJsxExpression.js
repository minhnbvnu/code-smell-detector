function updateJsxExpression(node, expression) {
                return node.expression !== expression ? update(createJsxExpression(node.dotDotDotToken, expression), node) : node;
            }