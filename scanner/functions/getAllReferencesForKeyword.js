function getAllReferencesForKeyword(sourceFiles, keywordKind, cancellationToken, filter2) {
                        const references = flatMap(sourceFiles, (sourceFile) => {
                            cancellationToken.throwIfCancellationRequested();
                            return mapDefined(getPossibleSymbolReferenceNodes(sourceFile, tokenToString(keywordKind), sourceFile), (referenceLocation) => {
                                if (referenceLocation.kind === keywordKind && (!filter2 || filter2(referenceLocation))) {
                                    return nodeEntry(referenceLocation);
                                }
                            });
                        });
                        return references.length ? [{ definition: { type: 2 /* Keyword */, node: references[0].node }, references }] : void 0;
                    }