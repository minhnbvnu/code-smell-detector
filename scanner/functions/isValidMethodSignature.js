function isValidMethodSignature(node) {
            return isMethodSignature(node) && (isInterfaceDeclaration(node.parent) || isTypeLiteralNode(node.parent));
        }