function assertSourceFileOkWithoutNextAffectedCall(state, sourceFile) {
            Debug.assert(!sourceFile || !state.affectedFiles || state.affectedFiles[state.affectedFilesIndex - 1] !== sourceFile || !state.semanticDiagnosticsPerFile.has(sourceFile.resolvedPath));
        }