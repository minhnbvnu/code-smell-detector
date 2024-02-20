function handleDtsMayChangeOfAffectedFile(state, affectedFile, cancellationToken, host) {
            removeSemanticDiagnosticsOf(state, affectedFile.resolvedPath);
            if (state.allFilesExcludingDefaultLibraryFile === state.affectedFiles) {
                removeDiagnosticsOfLibraryFiles(state);
                BuilderState.updateShapeSignature(state, Debug.checkDefined(state.program), affectedFile, cancellationToken, host);
                return;
            }
            if (state.compilerOptions.assumeChangesOnlyAffectDirectDependencies)
                return;
            handleDtsMayChangeOfReferencingExportOfAffectedFile(state, affectedFile, cancellationToken, host);
        }