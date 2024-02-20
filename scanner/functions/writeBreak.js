function writeBreak(label, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), operationLocation), 768 /* NoTokenSourceMaps */));
            }