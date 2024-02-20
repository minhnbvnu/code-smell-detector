function emitInferType(node) {
                writeKeyword("infer");
                writeSpace();
                emit(node.typeParameter);
            }