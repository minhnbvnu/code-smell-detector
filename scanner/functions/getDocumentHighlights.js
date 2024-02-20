function getDocumentHighlights(fileName, position, filesToSearch) {
                const normalizedFileName = normalizePath(fileName);
                Debug.assert(filesToSearch.some((f) => normalizePath(f) === normalizedFileName));
                synchronizeHostData();
                const sourceFilesToSearch = mapDefined(filesToSearch, (fileName2) => program.getSourceFile(fileName2));
                const sourceFile = getValidSourceFile(fileName);
                return DocumentHighlights.getDocumentHighlights(program, cancellationToken, sourceFile, position, sourceFilesToSearch);
            }