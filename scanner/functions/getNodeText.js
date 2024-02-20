function getNodeText(node) {
                            const sourceFile = getSourceFileOfNode(node);
                            return getSourceTextOfNodeFromSourceFile(sourceFile, node, 
                            /*includeTrivia*/
                            false);
                        }