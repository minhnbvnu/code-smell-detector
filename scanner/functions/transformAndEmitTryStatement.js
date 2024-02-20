function transformAndEmitTryStatement(node) {
                if (containsYield(node)) {
                    beginExceptionBlock();
                    transformAndEmitEmbeddedStatement(node.tryBlock);
                    if (node.catchClause) {
                        beginCatchBlock(node.catchClause.variableDeclaration);
                        transformAndEmitEmbeddedStatement(node.catchClause.block);
                    }
                    if (node.finallyBlock) {
                        beginFinallyBlock();
                        transformAndEmitEmbeddedStatement(node.finallyBlock);
                    }
                    endExceptionBlock();
                }
                else {
                    emitStatement(visitEachChild(node, visitor, context));
                }
            }