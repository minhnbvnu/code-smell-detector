function updateObjectLiteralExpression(node, properties) {
                return node.properties !== properties ? update(createObjectLiteralExpression(properties, node.multiLine), node) : node;
            }