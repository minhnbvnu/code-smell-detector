function emitExportDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                let nextPos = emitTokenWithComment(93 /* ExportKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                if (node.isTypeOnly) {
                    nextPos = emitTokenWithComment(154 /* TypeKeyword */, nextPos, writeKeyword, node);
                    writeSpace();
                }
                if (node.exportClause) {
                    emit(node.exportClause);
                }
                else {
                    nextPos = emitTokenWithComment(41 /* AsteriskToken */, nextPos, writePunctuation, node);
                }
                if (node.moduleSpecifier) {
                    writeSpace();
                    const fromPos = node.exportClause ? node.exportClause.end : nextPos;
                    emitTokenWithComment(158 /* FromKeyword */, fromPos, writeKeyword, node);
                    writeSpace();
                    emitExpression(node.moduleSpecifier);
                }
                if (node.assertClause) {
                    emitWithLeadingSpace(node.assertClause);
                }
                writeTrailingSemicolon();
            }