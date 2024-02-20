function useParent(node2, nodeTest, getNodes4) {
                            return nodeTest(node2) ? highlightSpans(getNodes4(node2, sourceFile)) : void 0;
                        }