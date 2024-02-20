function writeYield(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression(expression ? [createInstruction(4 /* Yield */), expression] : [createInstruction(4 /* Yield */)])), operationLocation), 768 /* NoTokenSourceMaps */));
            }