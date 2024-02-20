function emitQualifiedName(node) {
                emitEntityName(node.left);
                writePunctuation(".");
                emit(node.right);
            }