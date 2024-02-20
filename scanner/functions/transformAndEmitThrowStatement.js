function transformAndEmitThrowStatement(node) {
                var _a2;
                emitThrow(Debug.checkDefined(visitNode((_a2 = node.expression) != null ? _a2 : factory2.createVoidZero(), visitor, isExpression)), 
                /*location*/
                node);
            }