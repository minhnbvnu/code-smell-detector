function transformAndEmitReturnStatement(node) {
                emitReturn(visitNode(node.expression, visitor, isExpression), 
                /*location*/
                node);
            }