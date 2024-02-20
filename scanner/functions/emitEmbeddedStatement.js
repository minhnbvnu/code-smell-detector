function emitEmbeddedStatement(parent2, node) {
                if (isBlock(node) || getEmitFlags(parent2) & 1 /* SingleLine */) {
                    writeSpace();
                    emit(node);
                }
                else {
                    writeLine();
                    increaseIndent();
                    if (isEmptyStatement(node)) {
                        pipelineEmit(5 /* EmbeddedStatement */, node);
                    }
                    else {
                        emit(node);
                    }
                    decreaseIndent();
                }
            }