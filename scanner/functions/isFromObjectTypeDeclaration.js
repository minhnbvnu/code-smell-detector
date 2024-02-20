function isFromObjectTypeDeclaration(node) {
            return node.parent && isClassOrTypeElement(node.parent) && isObjectTypeDeclaration(node.parent.parent);
        }