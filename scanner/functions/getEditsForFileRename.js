function getEditsForFileRename(program, oldFileOrDirPath, newFileOrDirPath, host, formatContext, preferences, sourceMapper) {
            const useCaseSensitiveFileNames = hostUsesCaseSensitiveFileNames(host);
            const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames);
            const oldToNew = getPathUpdater(oldFileOrDirPath, newFileOrDirPath, getCanonicalFileName, sourceMapper);
            const newToOld = getPathUpdater(newFileOrDirPath, oldFileOrDirPath, getCanonicalFileName, sourceMapper);
            return ts_textChanges_exports.ChangeTracker.with({ host, formatContext, preferences }, (changeTracker) => {
                updateTsconfigFiles(program, changeTracker, oldToNew, oldFileOrDirPath, newFileOrDirPath, host.getCurrentDirectory(), useCaseSensitiveFileNames);
                updateImports(program, changeTracker, oldToNew, newToOld, host, getCanonicalFileName);
            });
        }