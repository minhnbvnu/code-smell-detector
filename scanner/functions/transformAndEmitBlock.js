function transformAndEmitBlock(node) {
                if (containsYield(node)) {
                    transformAndEmitStatements(node.statements);
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }