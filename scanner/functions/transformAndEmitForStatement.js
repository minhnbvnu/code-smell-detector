function transformAndEmitForStatement(node) {
                if (containsYield(node)) {
                    const conditionLabel = defineLabel();
                    const incrementLabel = defineLabel();
                    const endLabel = beginLoopBlock(incrementLabel);
                    if (node.initializer) {
                        const initializer = node.initializer;
                        if (isVariableDeclarationList(initializer)) {
                            transformAndEmitVariableDeclarationList(initializer);
                        }
                        else {
                            emitStatement(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(initializer, visitor, isExpression))), initializer));
                        }
                    }
                    markLabel(conditionLabel);
                    if (node.condition) {
                        emitBreakWhenFalse(endLabel, Debug.checkDefined(visitNode(node.condition, visitor, isExpression)));
                    }
                    transformAndEmitEmbeddedStatement(node.statement);
                    markLabel(incrementLabel);
                    if (node.incrementor) {
                        emitStatement(setTextRange(factory2.createExpressionStatement(Debug.checkDefined(visitNode(node.incrementor, visitor, isExpression))), node.incrementor));
                    }
                    emitBreak(conditionLabel);
                    endLoopBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }