function right(machine, stackIndex, stateStack, nodeStack, userStateStack, _resultHolder, _outerState) {
                        Debug.assertEqual(stateStack[stackIndex], right);
                        Debug.assertIsDefined(machine.onRight);
                        stateStack[stackIndex] = nextState(machine, right);
                        const nextNode = machine.onRight(nodeStack[stackIndex].right, userStateStack[stackIndex], nodeStack[stackIndex]);
                        if (nextNode) {
                            checkCircularity(stackIndex, nodeStack, nextNode);
                            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
                        }
                        return stackIndex;
                    }