function writeThrow(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                lastOperationWasCompletion = true;
                writeStatement(setTextRange(factory2.createThrowStatement(expression), operationLocation));
            }