function moveElementEntirelyPastChangeRange(element, isArray2, delta, oldText, newText, aggressiveChecks) {
                        if (isArray2) {
                            visitArray2(element);
                        }
                        else {
                            visitNode3(element);
                        }
                        return;
                        function visitNode3(node) {
                            let text = "";
                            if (aggressiveChecks && shouldCheckNode(node)) {
                                text = oldText.substring(node.pos, node.end);
                            }
                            if (node._children) {
                                node._children = void 0;
                            }
                            setTextRangePosEnd(node, node.pos + delta, node.end + delta);
                            if (aggressiveChecks && shouldCheckNode(node)) {
                                Debug.assert(text === newText.substring(node.pos, node.end));
                            }
                            forEachChild(node, visitNode3, visitArray2);
                            if (hasJSDocNodes(node)) {
                                for (const jsDocComment of node.jsDoc) {
                                    visitNode3(jsDocComment);
                                }
                            }
                            checkNodePositions(node, aggressiveChecks);
                        }
                        function visitArray2(array) {
                            array._children = void 0;
                            setTextRangePosEnd(array, array.pos + delta, array.end + delta);
                            for (const node of array) {
                                visitNode3(node);
                            }
                        }
                    }