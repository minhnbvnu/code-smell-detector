function argumentStartsOnSameLineAsPreviousArgument(parent2, child, childStartLine, sourceFile) {
                        if (isCallOrNewExpression(parent2)) {
                            if (!parent2.arguments)
                                return false;
                            const currentNode = find(parent2.arguments, (arg) => arg.pos === child.pos);
                            if (!currentNode)
                                return false;
                            const currentIndex = parent2.arguments.indexOf(currentNode);
                            if (currentIndex === 0)
                                return false;
                            const previousNode = parent2.arguments[currentIndex - 1];
                            const lineOfPreviousNode = getLineAndCharacterOfPosition(sourceFile, previousNode.getEnd()).line;
                            if (childStartLine === lineOfPreviousNode) {
                                return true;
                            }
                        }
                        return false;
                    }