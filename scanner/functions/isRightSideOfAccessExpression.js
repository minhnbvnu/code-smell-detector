function isRightSideOfAccessExpression(node) {
            return isPropertyAccessExpression(node.parent) && node.parent.name === node || isElementAccessExpression(node.parent) && node.parent.argumentExpression === node;
        }