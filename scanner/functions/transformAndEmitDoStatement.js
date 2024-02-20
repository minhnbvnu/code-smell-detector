function transformAndEmitDoStatement(node) {
                if (containsYield(node)) {
                    const conditionLabel = defineLabel();
                    const loopLabel = defineLabel();
                    beginLoopBlock(
                    /*continueLabel*/
                    conditionLabel);
                    markLabel(loopLabel);
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(conditionLabel);
                    emitBreakWhenTrue(loopLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }