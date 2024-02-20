function isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(node) {
            return isQualifiedName(node.parent) && node.parent.right === node || isPropertyAccessExpression(node.parent) && node.parent.name === node || isJSDocMemberName(node.parent) && node.parent.right === node;
        }