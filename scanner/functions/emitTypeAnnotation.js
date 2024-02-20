function emitTypeAnnotation(node) {
                if (node) {
                    writePunctuation(":");
                    writeSpace();
                    emit(node);
                }
            }