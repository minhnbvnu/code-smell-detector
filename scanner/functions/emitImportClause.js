function emitImportClause(node) {
                if (node.isTypeOnly) {
                    emitTokenWithComment(154 /* TypeKeyword */, node.pos, writeKeyword, node);
                    writeSpace();
                }
                emit(node.name);
                if (node.name && node.namedBindings) {
                    emitTokenWithComment(27 /* CommaToken */, node.name.end, writePunctuation, node);
                    writeSpace();
                }
                emit(node.namedBindings);
            }