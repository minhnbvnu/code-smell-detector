function isRightSideOfQualifiedNameOrPropertyAccess(node) {
            return node.parent.kind === 163 /* QualifiedName */ && node.parent.right === node || node.parent.kind === 208 /* PropertyAccessExpression */ && node.parent.name === node;
        }