function emitMappedTypeParameter(node) {
                emit(node.name);
                writeSpace();
                writeKeyword("in");
                writeSpace();
                emit(node.constraint);
            }