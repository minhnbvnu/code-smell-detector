function writeEndfinally() {
                lastOperationWasAbrupt = true;
                writeStatement(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(7 /* Endfinally */)
                ])));
            }