function emitTypeParameter(node) {
                emitModifierList(node, node.modifiers);
                emit(node.name);
                if (node.constraint) {
                    writeSpace();
                    writeKeyword("extends");
                    writeSpace();
                    emit(node.constraint);
                }
                if (node.default) {
                    writeSpace();
                    writeOperator("=");
                    writeSpace();
                    emit(node.default);
                }
            }