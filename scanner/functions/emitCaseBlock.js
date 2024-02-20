function emitCaseBlock(node) {
                emitTokenWithComment(18 /* OpenBraceToken */, node.pos, writePunctuation, node);
                emitList(node, node.clauses, 129 /* CaseBlockClauses */);
                emitTokenWithComment(19 /* CloseBraceToken */, node.clauses.end, writePunctuation, node, 
                /*indentLeading*/
                true);
            }