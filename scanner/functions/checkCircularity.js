function checkCircularity(stackIndex, nodeStack, node) {
                        if (Debug.shouldAssert(2 /* Aggressive */)) {
                            while (stackIndex >= 0) {
                                Debug.assert(nodeStack[stackIndex] !== node, "Circular traversal detected.");
                                stackIndex--;
                            }
                        }
                    }