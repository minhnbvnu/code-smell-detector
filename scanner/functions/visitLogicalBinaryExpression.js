function visitLogicalBinaryExpression(node) {
                const resultLabel = defineLabel();
                const resultLocal = declareLocal();
                emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.left, visitor, isExpression)), 
                /*location*/
                node.left);
                if (node.operatorToken.kind === 55 /* AmpersandAmpersandToken */) {
                    emitBreakWhenFalse(resultLabel, resultLocal, 
                    /*location*/
                    node.left);
                }
                else {
                    emitBreakWhenTrue(resultLabel, resultLocal, 
                    /*location*/
                    node.left);
                }
                emitAssignment(resultLocal, Debug.checkDefined(visitNode(node.right, visitor, isExpression)), 
                /*location*/
                node.right);
                markLabel(resultLabel);
                return resultLocal;
            }