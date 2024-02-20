function createDownlevelAwait(expression) {
                return enclosingFunctionFlags & 1 /* Generator */ ? factory2.createYieldExpression(
                /*asteriskToken*/
                void 0, emitHelpers().createAwaitHelper(expression)) : factory2.createAwaitExpression(expression);
            }