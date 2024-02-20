function emitEntityName(node) {
                if (node.kind === 79 /* Identifier */) {
                    emitExpression(node);
                }
                else {
                    emit(node);
                }
            }