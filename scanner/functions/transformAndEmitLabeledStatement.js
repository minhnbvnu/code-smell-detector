function transformAndEmitLabeledStatement(node) {
                if (containsYield(node)) {
                    beginLabeledBlock(idText(node.label));
                    transformAndEmitEmbeddedStatement(node.statement);
                    endLabeledBlock();
                }
                else {
                    emitStatement(visitNode(node, visitor, isStatement));
                }
            }