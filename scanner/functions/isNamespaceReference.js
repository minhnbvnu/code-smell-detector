function isNamespaceReference(node) {
            return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node);
        }