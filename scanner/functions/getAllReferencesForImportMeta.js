function getAllReferencesForImportMeta(sourceFiles, cancellationToken) {
                        const references = flatMap(sourceFiles, (sourceFile) => {
                            cancellationToken.throwIfCancellationRequested();
                            return mapDefined(getPossibleSymbolReferenceNodes(sourceFile, "meta", sourceFile), (node) => {
                                const parent2 = node.parent;
                                if (isImportMeta(parent2)) {
                                    return nodeEntry(parent2);
                                }
                            });
                        });
                        return references.length ? [{ definition: { type: 2 /* Keyword */, node: references[0].node }, references }] : void 0;
                    }