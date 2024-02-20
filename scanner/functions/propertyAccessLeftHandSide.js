function propertyAccessLeftHandSide(node) {
            return isPropertyAccessExpression(node) ? propertyAccessLeftHandSide(node.expression) : node;
        }