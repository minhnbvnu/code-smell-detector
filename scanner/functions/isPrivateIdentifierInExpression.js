function isPrivateIdentifierInExpression(node) {
            return isPrivateIdentifier(node.left) && node.operatorToken.kind === 101 /* InKeyword */;
        }