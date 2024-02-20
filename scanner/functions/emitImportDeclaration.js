function emitImportDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                emitTokenWithComment(100 /* ImportKeyword */, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
                writeSpace();
                if (node.importClause) {
                    emit(node.importClause);
                    writeSpace();
                    emitTokenWithComment(158 /* FromKeyword */, node.importClause.end, writeKeyword, node);
                    writeSpace();
                }
                emitExpression(node.moduleSpecifier);
                if (node.assertClause) {
                    emitWithLeadingSpace(node.assertClause);
                }
                writeTrailingSemicolon();
            }