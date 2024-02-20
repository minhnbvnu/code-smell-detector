function left(machine, stackIndex, stateStack, nodeStack, userStateStack, _resultHolder, _outerState) {
                        Debug.assertEqual(stateStack[stackIndex], left);
                        Debug.assertIsDefined(machine.onLeft);
                        stateStack[stackIndex] = nextState(machine, left);
                        const nextNode = machine.onLeft(nodeStack[stackIndex].left, userStateStack[stackIndex], nodeStack[stackIndex]);
                        if (nextNode) {
                            checkCircularity(stackIndex, nodeStack, nextNode);
                            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
                        }
                        return stackIndex;
                    }