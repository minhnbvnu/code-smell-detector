function updateTokenPositionsAndMarkElements(sourceFile, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta, oldText, newText, aggressiveChecks) {
                        visitNode3(sourceFile);
                        return;
                        function visitNode3(child) {
                            Debug.assert(child.pos <= child.end);
                            if (child.pos > changeRangeOldEnd) {
                                moveElementEntirelyPastChangeRange(child, 
                                /*isArray*/
                                false, delta, oldText, newText, aggressiveChecks);
                                return;
                            }
                            const fullEnd = child.end;
                            if (fullEnd >= changeStart) {
                                child.intersectsChange = true;
                                child._children = void 0;
                                adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                                forEachChild(child, visitNode3, visitArray2);
                                if (hasJSDocNodes(child)) {
                                    for (const jsDocComment of child.jsDoc) {
                                        visitNode3(jsDocComment);
                                    }
                                }
                                checkNodePositions(child, aggressiveChecks);
                                return;
                            }
                            Debug.assert(fullEnd < changeStart);
                        }
                        function visitArray2(array) {
                            Debug.assert(array.pos <= array.end);
                            if (array.pos > changeRangeOldEnd) {
                                moveElementEntirelyPastChangeRange(array, 
                                /*isArray*/
                                true, delta, oldText, newText, aggressiveChecks);
                                return;
                            }
                            const fullEnd = array.end;
                            if (fullEnd >= changeStart) {
                                array.intersectsChange = true;
                                array._children = void 0;
                                adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                                for (const node of array) {
                                    visitNode3(node);
                                }
                                return;
                            }
                            Debug.assert(fullEnd < changeStart);
                        }
                    }