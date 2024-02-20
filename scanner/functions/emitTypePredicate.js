function emitTypePredicate(node) {
                if (node.assertsModifier) {
                    emit(node.assertsModifier);
                    writeSpace();
                }
                emit(node.parameterName);
                if (node.type) {
                    writeSpace();
                    writeKeyword("is");
                    writeSpace();
                    emit(node.type);
                }
            }