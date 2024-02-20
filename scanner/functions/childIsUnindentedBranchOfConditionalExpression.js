function childIsUnindentedBranchOfConditionalExpression(parent2, child, childStartLine, sourceFile) {
                        if (isConditionalExpression(parent2) && (child === parent2.whenTrue || child === parent2.whenFalse)) {
                            const conditionEndLine = getLineAndCharacterOfPosition(sourceFile, parent2.condition.end).line;
                            if (child === parent2.whenTrue) {
                                return childStartLine === conditionEndLine;
                            }
                            else {
                                const trueStartLine = getStartLineAndCharacterForNode(parent2.whenTrue, sourceFile).line;
                                const trueEndLine = getLineAndCharacterOfPosition(sourceFile, parent2.whenTrue.end).line;
                                return conditionEndLine === trueStartLine && trueEndLine === childStartLine;
                            }
                        }
                        return false;
                    }