function emitLabeledStatement(node) {
                emit(node.label);
                emitTokenWithComment(58 /* ColonToken */, node.label.end, writePunctuation, node);
                writeSpace();
                emit(node.statement);
            }