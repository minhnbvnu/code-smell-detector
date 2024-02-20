function emitDebuggerStatement(node) {
                writeToken(87 /* DebuggerKeyword */, node.pos, writeKeyword);
                writeTrailingSemicolon();
            }