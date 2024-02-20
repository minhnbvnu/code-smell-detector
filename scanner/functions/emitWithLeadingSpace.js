function emitWithLeadingSpace(node) {
                if (node) {
                    writeSpace();
                    emit(node);
                }
            }