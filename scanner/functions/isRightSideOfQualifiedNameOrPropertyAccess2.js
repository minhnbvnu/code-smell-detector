function isRightSideOfQualifiedNameOrPropertyAccess2(node) {
            return isQualifiedName(node.parent) && node.parent.right === node || isPropertyAccessExpression(node.parent) && node.parent.name === node;
        }