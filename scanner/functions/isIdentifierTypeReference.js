function isIdentifierTypeReference(node) {
            return isTypeReferenceNode(node) && isIdentifier(node.typeName);
        }