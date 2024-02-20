function transformAndEmitEmbeddedStatement(node) {
                if (isBlock(node)) {
                    transformAndEmitStatements(node.statements);
                }
                else {
                    transformAndEmitStatement(node);
                }
            }