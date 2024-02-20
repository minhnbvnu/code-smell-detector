function emitNamespaceExport(node) {
                const asPos = emitTokenWithComment(41 /* AsteriskToken */, node.pos, writePunctuation, node);
                writeSpace();
                emitTokenWithComment(128 /* AsKeyword */, asPos, writeKeyword, node);
                writeSpace();
                emit(node.name);
            }