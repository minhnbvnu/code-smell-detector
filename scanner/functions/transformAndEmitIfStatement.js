function transformAndEmitIfStatement(node) {
                if (containsYield(node)) {
                    if (containsYield(node.thenStatement) || containsYield(node.elseStatement)) {
                        const endLabel = defineLabel();
                        const elseLabel = node.elseStatement ? defineLabel() : void 0;
                        emitBreakWhenFalse(node.elseStatement ? elseLabel : endLabel, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), 
                        /*location*/
                        node.expression);
                        transformAndEmitEmbeddedStatement(node.thenStatement);
                        if (node.elseStatement) {
                            emitBreak(endLabel);
                            markLabel(elseLabel);
                            transformAndEmitEmbeddedStatement(node.elseStatement);
                        }
                        markLabel(endLabel);
                    }
                    else {
                        emitStatement(visitNode(node, visitor, isStatement));
                    }
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }