function createSyntaxCursor(sourceFile) {
                        let currentArray = sourceFile.statements;
                        let currentArrayIndex = 0;
                        Debug.assert(currentArrayIndex < currentArray.length);
                        let current = currentArray[currentArrayIndex];
                        let lastQueriedPosition = -1 /* Value */;
                        return {
                            currentNode(position) {
                                if (position !== lastQueriedPosition) {
                                    if (current && current.end === position && currentArrayIndex < currentArray.length - 1) {
                                        currentArrayIndex++;
                                        current = currentArray[currentArrayIndex];
                                    }
                                    if (!current || current.pos !== position) {
                                        findHighestListElementThatStartsAtPosition(position);
                                    }
                                }
                                lastQueriedPosition = position;
                                Debug.assert(!current || current.pos === position);
                                return current;
                            }
                        };
                        function findHighestListElementThatStartsAtPosition(position) {
                            currentArray = void 0;
                            currentArrayIndex = -1 /* Value */;
                            current = void 0;
                            forEachChild(sourceFile, visitNode3, visitArray2);
                            return;
                            function visitNode3(node) {
                                if (position >= node.pos && position < node.end) {
                                    forEachChild(node, visitNode3, visitArray2);
                                    return true;
                                }
                                return false;
                            }
                            function visitArray2(array) {
                                if (position >= array.pos && position < array.end) {
                                    for (let i = 0; i < array.length; i++) {
                                        const child = array[i];
                                        if (child) {
                                            if (child.pos === position) {
                                                currentArray = array;
                                                currentArrayIndex = i;
                                                current = child;
                                                return true;
                                            }
                                            else {
                                                if (child.pos < position && position < child.end) {
                                                    forEachChild(child, visitNode3, visitArray2);
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                                return false;
                            }
                        }
                    }