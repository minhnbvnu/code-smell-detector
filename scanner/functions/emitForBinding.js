function emitForBinding(node) {
                if (node !== void 0) {
                    if (node.kind === 258 /* VariableDeclarationList */) {
                        emit(node);
                    }
                    else {
                        emitExpression(node);
                    }
                }
            }