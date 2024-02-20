function emitBreakStatement(node) {
                emitTokenWithComment(81 /* BreakKeyword */, node.pos, writeKeyword, node);
                emitWithLeadingSpace(node.label);
                writeTrailingSemicolon();
            }