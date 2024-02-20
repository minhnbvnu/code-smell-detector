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