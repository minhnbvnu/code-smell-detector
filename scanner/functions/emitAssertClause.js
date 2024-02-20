function emitAssertClause(node) {
                emitTokenWithComment(130 /* AssertKeyword */, node.pos, writeKeyword, node);
                writeSpace();
                const elements = node.elements;
                emitList(node, elements, 526226 /* ImportClauseEntries */);
            }