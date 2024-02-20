function visitYieldExpression(node) {
                const resumeLabel = defineLabel();
                const expression = visitNode(node.expression, visitor, isExpression);
                if (node.asteriskToken) {
                    const iterator = (getEmitFlags(node.expression) & 16777216 /* Iterator */) === 0 ? setTextRange(emitHelpers().createValuesHelper(expression), node) : expression;
                    emitYieldStar(iterator, 
                    /*location*/
                    node);
                }
                else {
                    emitYield(expression, 
                    /*location*/
                    node);
                }
                markLabel(resumeLabel);
                return createGeneratorResume(
                /*location*/
                node);
            }