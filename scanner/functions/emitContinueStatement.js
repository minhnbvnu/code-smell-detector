function emitContinueStatement(node) {
                emitTokenWithComment(86 /* ContinueKeyword */, node.pos, writeKeyword, node);
                emitWithLeadingSpace(node.label);
                writeTrailingSemicolon();
            }