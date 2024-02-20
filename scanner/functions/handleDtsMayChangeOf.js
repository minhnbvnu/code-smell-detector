function handleDtsMayChangeOf(state, path, cancellationToken, host) {
            removeSemanticDiagnosticsOf(state, path);
            if (!state.changedFilesSet.has(path)) {
                const program = Debug.checkDefined(state.program);
                const sourceFile = program.getSourceFileByPath(path);
                if (sourceFile) {
                    BuilderState.updateShapeSignature(state, program, sourceFile, cancellationToken, host, 
                    /*useFileVersionAsSignature*/
                    true);
                    if (getEmitDeclarations(state.compilerOptions)) {
                        addToAffectedFilesPendingEmit(state, path, state.compilerOptions.declarationMap ? 24 /* AllDts */ : 8 /* Dts */);
                    }
                }
            }
        }