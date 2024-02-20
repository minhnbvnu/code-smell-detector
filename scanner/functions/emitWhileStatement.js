function emitWhileStatement(node) {
                emitWhileClause(node, node.pos);
                emitEmbeddedStatement(node, node.statement);
            }