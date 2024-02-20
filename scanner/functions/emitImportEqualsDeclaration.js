function emitImportEqualsDeclaration(node) {
                emitDecoratorsAndModifiers(node, node.modifiers, 
                /*allowDecorators*/
                false);
                emitTokenWithComment(100 /* ImportKeyword */, node.modifiers ? node.modifiers.end : node.pos, writeKeyword, node);
                writeSpace();
                if (node.isTypeOnly) {
                    emitTokenWithComment(154 /* TypeKeyword */, node.pos, writeKeyword, node);
                    writeSpace();
                }
                emit(node.name);
                writeSpace();
                emitTokenWithComment(63 /* EqualsToken */, node.name.end, writePunctuation, node);
                writeSpace();
                emitModuleReference(node.moduleReference);
                writeTrailingSemicolon();
            }