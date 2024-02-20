function isPrivateIdentifierPropertyAccessExpression(node) {
            return isPropertyAccessExpression(node) && isPrivateIdentifier(node.name);
        }