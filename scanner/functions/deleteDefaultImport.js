function deleteDefaultImport(changes, sourceFile, importClause) {
                        if (!importClause.namedBindings) {
                            deleteNode(changes, sourceFile, importClause.parent);
                        }
                        else {
                            const start = importClause.name.getStart(sourceFile);
                            const nextToken = getTokenAtPosition(sourceFile, importClause.name.end);
                            if (nextToken && nextToken.kind === 27 /* CommaToken */) {
                                const end = skipTrivia(sourceFile.text, nextToken.end, 
                                /*stopAfterLineBreaks*/
                                false, 
                                /*stopAtComments*/
                                true);
                                changes.deleteRange(sourceFile, { pos: start, end });
                            }
                            else {
                                deleteNode(changes, sourceFile, importClause.name);
                            }
                        }
                    }