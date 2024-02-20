function isObjectTypeDeclaration(node) {
            return isClassLike(node) || isInterfaceDeclaration(node) || isTypeLiteralNode(node);
        }