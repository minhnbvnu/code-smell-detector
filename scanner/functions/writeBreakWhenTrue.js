function writeBreakWhenTrue(label, condition, operationLocation) {
                writeStatement(setEmitFlags(factory2.createIfStatement(condition, setEmitFlags(setTextRange(factory2.createReturnStatement(factory2.createArrayLiteralExpression([
                    createInstruction(3 /* Break */),
                    createLabel(label)
                ])), operationLocation), 768 /* NoTokenSourceMaps */)), 1 /* SingleLine */));
            }