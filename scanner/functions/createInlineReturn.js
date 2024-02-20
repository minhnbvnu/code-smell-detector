function createInlineReturn(expression, location) {
                return setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(2 /* Return */), expression] : [createInstruction(2 /* Return */)])), location);
            }