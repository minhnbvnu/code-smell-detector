function visitConditionalExpression(node) {
                if (containsYield(node.whenTrue) || containsYield(node.whenFalse)) {
                    const whenFalseLabel = defineLabel();
                    const resultLabel = defineLabel();
                    const resultLocal = declareLocal();
                    emitBreakWhenFalse(whenFalseLabel, Debug.checkDefined(visitNode(node.condition, visitor, isExpression)), 
                    /*location*/
                    node.condition);
                    emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.whenTrue, visitor, isExpression)), 
                    /*location*/
                    node.whenTrue);
                    emitBreak(resultLabel);
                    markLabel(whenFalseLabel);
                    emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.whenFalse, visitor, isExpression)), 
                    /*location*/
                    node.whenFalse);
                    markLabel(resultLabel);
                    return resultLocal;
                }
                return visitEachChild(node, visitor, context);
            }