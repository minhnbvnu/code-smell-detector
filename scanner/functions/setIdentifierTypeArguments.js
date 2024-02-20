function setIdentifierTypeArguments(node, typeArguments) {
            getOrCreateEmitNode(node).identifierTypeArguments = typeArguments;
            return node;
        }