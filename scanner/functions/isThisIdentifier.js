function isThisIdentifier(node) {
        return (!!node &&
            node.kind === SyntaxKind.Identifier &&
            identifierIsThisKeyword(node));
    }