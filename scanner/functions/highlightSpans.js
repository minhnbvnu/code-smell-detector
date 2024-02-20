function highlightSpans(nodes) {
                            return nodes && nodes.map((node2) => getHighlightSpanForNode(node2, sourceFile));
                        }