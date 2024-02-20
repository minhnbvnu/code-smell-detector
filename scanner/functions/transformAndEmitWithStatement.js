function transformAndEmitWithStatement(node) {
                if (containsYield(node)) {
                    beginWithBlock(cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isExpression))));
                    transformAndEmitEmbeddedStatement(node.statement);
                    endWithBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }