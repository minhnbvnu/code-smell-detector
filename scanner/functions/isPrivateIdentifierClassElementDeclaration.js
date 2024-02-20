function isPrivateIdentifierClassElementDeclaration(node) {
            return (isPropertyDeclaration(node) || isMethodOrAccessor(node)) && isPrivateIdentifier(node.name);
        }