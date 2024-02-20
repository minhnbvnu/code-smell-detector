function getSemanticDocumentHighlights(position, node, program, cancellationToken, sourceFilesToSearch) {
                        const sourceFilesSet = new Set(sourceFilesToSearch.map((f) => f.fileName));
                        const referenceEntries = ts_FindAllReferences_exports.getReferenceEntriesForNode(position, node, program, sourceFilesToSearch, cancellationToken, 
                        /*options*/
                        void 0, sourceFilesSet);
                        if (!referenceEntries)
                            return void 0;
                        const map2 = arrayToMultiMap(referenceEntries.map(ts_FindAllReferences_exports.toHighlightSpan), (e) => e.fileName, (e) => e.span);
                        const getCanonicalFileName = createGetCanonicalFileName(program.useCaseSensitiveFileNames());
                        return arrayFrom(mapDefinedIterator(map2.entries(), ([fileName, highlightSpans]) => {
                            if (!sourceFilesSet.has(fileName)) {
                                if (!program.redirectTargetsMap.has(toPath(fileName, program.getCurrentDirectory(), getCanonicalFileName))) {
                                    return void 0;
                                }
                                const redirectTarget = program.getSourceFile(fileName);
                                const redirect = find(sourceFilesToSearch, (f) => !!f.redirectInfo && f.redirectInfo.redirectTarget === redirectTarget);
                                fileName = redirect.fileName;
                                Debug.assert(sourceFilesSet.has(fileName));
                            }
                            return { fileName, highlightSpans };
                        }));
                    }