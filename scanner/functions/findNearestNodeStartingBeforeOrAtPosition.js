function findNearestNodeStartingBeforeOrAtPosition(sourceFile, position) {
                        let bestResult = sourceFile;
                        let lastNodeEntirelyBeforePosition;
                        forEachChild(sourceFile, visit);
                        if (lastNodeEntirelyBeforePosition) {
                            const lastChildOfLastEntireNodeBeforePosition = getLastDescendant(lastNodeEntirelyBeforePosition);
                            if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
                                bestResult = lastChildOfLastEntireNodeBeforePosition;
                            }
                        }
                        return bestResult;
                        function getLastDescendant(node) {
                            while (true) {
                                const lastChild = getLastChild(node);
                                if (lastChild) {
                                    node = lastChild;
                                }
                                else {
                                    return node;
                                }
                            }
                        }
                        function visit(child) {
                            if (nodeIsMissing(child)) {
                                return;
                            }
                            if (child.pos <= position) {
                                if (child.pos >= bestResult.pos) {
                                    bestResult = child;
                                }
                                if (position < child.end) {
                                    forEachChild(child, visit);
                                    return true;
                                }
                                else {
                                    Debug.assert(child.end <= position);
                                    lastNodeEntirelyBeforePosition = child;
                                }
                            }
                            else {
                                Debug.assert(child.pos > position);
                                return true;
                            }
                        }
                    }