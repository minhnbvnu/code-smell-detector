function getHighlightSpanForNode(node, sourceFile) {
                        return {
                            fileName: sourceFile.fileName,
                            textSpan: createTextSpanFromNode(node, sourceFile),
                            kind: "none" /* none */
                        };
                    }