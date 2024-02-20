function createImportTracker(sourceFiles, sourceFilesSet, checker, cancellationToken) {
            const allDirectImports = getDirectImportsMap(sourceFiles, checker, cancellationToken);
            return (exportSymbol, exportInfo, isForRename) => {
                const { directImports, indirectUsers } = getImportersForExport(sourceFiles, sourceFilesSet, allDirectImports, exportInfo, checker, cancellationToken);
                return { indirectUsers, ...getSearchesFromDirectImports(directImports, exportSymbol, exportInfo.exportKind, checker, isForRename) };
            };
        }