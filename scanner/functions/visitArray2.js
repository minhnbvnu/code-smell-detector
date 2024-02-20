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