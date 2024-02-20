function emitDefaultClause(node) {
                const pos = emitTokenWithComment(88 /* DefaultKeyword */, node.pos, writeKeyword, node);
                emitCaseOrDefaultClauseRest(node, node.statements, pos);
            }