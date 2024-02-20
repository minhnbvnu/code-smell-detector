function emitNamespaceExportDeclaration(node) {
                let nextPos = emitTokenWithComment(93 /* ExportKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                nextPos = emitTokenWithComment(128 /* AsKeyword */, nextPos, writeKeyword, node);
                writeSpace();
                nextPos = emitTokenWithComment(143 /* NamespaceKeyword */, nextPos, writeKeyword, node);
                writeSpace();
                emit(node.name);
                writeTrailingSemicolon();
            }