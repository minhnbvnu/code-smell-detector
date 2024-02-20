function transformAndEmitExpressionStatement(node) {
                emitStatement(visitNode(node, visitor, isStatement));
            }