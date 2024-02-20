function currentNode2(position) {
                            const node = baseSyntaxCursor.currentNode(position);
                            if (topLevel && node && containsPossibleTopLevelAwait(node)) {
                                node.intersectsChange = true;
                            }
                            return node;
                        }