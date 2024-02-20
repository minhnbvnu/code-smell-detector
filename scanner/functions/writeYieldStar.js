function writeYieldStar(expression, operationLocation) {
                lastOperationWasAbrupt = true;
                writeStatement(setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(5 /* YieldStar */),
                    expression
                ])), operationLocation), 768 /* NoTokenSourceMaps */));
            }