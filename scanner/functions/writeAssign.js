function writeAssign(left, right, operationLocation) {
                writeStatement(setTextRange(factory2.createExpressionStatement(factory2.createAssignment(left, right)), operationLocation));
            }