function transformAndEmitWhileStatement(node) {
                if (containsYield(node)) {
                    const loopLabel = defineLabel();
                    const endLabel = beginLoopBlock(loopLabel);
                    markLabel(loopLabel);
                    emitBreakWhenFalse(endLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    transformAndEmitEmbeddedStatement(node.statement);
                    emitBreak(loopLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }