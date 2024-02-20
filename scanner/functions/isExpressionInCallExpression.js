function isExpressionInCallExpression(node) {
            while (isRightSideOfQualifiedNameOrPropertyAccess2(node)) {
                node = node.parent;
            }
            return isCallExpression(node.parent) && node.parent.expression === node;
        }