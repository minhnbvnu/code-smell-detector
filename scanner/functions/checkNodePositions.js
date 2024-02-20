function checkNodePositions(node, aggressiveChecks) {
                        if (aggressiveChecks) {
                            let pos = node.pos;
                            const visitNode3 = (child) => {
                                Debug.assert(child.pos >= pos);
                                pos = child.end;
                            };
                            if (hasJSDocNodes(node)) {
                                for (const jsDocComment of node.jsDoc) {
                                    visitNode3(jsDocComment);
                                }
                            }
                            forEachChild(node, visitNode3);
                            Debug.assert(pos <= node.end);
                        }
                    }