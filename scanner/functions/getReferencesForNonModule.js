function getReferencesForNonModule(referencedFile, refFileMap, program) {
                        let entries;
                        const references = refFileMap.get(referencedFile.path) || emptyArray;
                        for (const ref of references) {
                            if (isReferencedFile(ref)) {
                                const referencingFile = program.getSourceFileByPath(ref.file);
                                const location = getReferencedFileLocation(program.getSourceFileByPath, ref);
                                if (isReferenceFileLocation(location)) {
                                    entries = append(entries, {
                                        kind: 0 /* Span */,
                                        fileName: referencingFile.fileName,
                                        textSpan: createTextSpanFromRange(location)
                                    });
                                }
                            }
                        }
                        return entries;
                    }