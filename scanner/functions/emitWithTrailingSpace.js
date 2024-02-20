function emitWithTrailingSpace(node) {
                if (node) {
                    emit(node);
                    writeSpace();
                }
            }