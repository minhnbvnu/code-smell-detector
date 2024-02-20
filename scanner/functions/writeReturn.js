function writeReturn(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                lastOperationWasCompletion = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(2 /* Return */), expression] : [createInstruction(2 /* Return */)])), operationLocation), 768 /* NoTokenSourceMaps */));
            }