function emitTypeQuery(node) {
                writeKeyword("typeof");
                writeSpace();
                emit(node.exprName);
                emitTypeArguments(node, node.typeArguments);
            }