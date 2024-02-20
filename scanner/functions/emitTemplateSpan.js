function emitTemplateSpan(node) {
                emitExpression(node.expression);
                emit(node.literal);
            }