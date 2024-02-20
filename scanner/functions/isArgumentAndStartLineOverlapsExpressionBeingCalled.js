function isArgumentAndStartLineOverlapsExpressionBeingCalled(parent2, child, childStartLine, sourceFile) {
                        if (!(isCallExpression(parent2) && contains(parent2.arguments, child))) {
                            return false;
                        }
                        const expressionOfCallExpressionEnd = parent2.expression.getEnd();
                        const expressionOfCallExpressionEndLine = getLineAndCharacterOfPosition(sourceFile, expressionOfCallExpressionEnd).line;
                        return expressionOfCallExpressionEndLine === childStartLine;
                    }