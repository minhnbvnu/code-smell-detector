function emitTypeReference(node) {
                emit(node.typeName);
                emitTypeArguments(node, node.typeArguments);
            }