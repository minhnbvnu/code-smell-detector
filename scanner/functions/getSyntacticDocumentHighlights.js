function getSyntacticDocumentHighlights(node, sourceFile) {
                        const highlightSpans = getHighlightSpans(node, sourceFile);
                        return highlightSpans && [{ fileName: sourceFile.fileName, highlightSpans }];
                    }