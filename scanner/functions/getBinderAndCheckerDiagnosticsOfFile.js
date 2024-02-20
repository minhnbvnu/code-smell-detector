function getBinderAndCheckerDiagnosticsOfFile(state, sourceFile, cancellationToken) {
            const path = sourceFile.resolvedPath;
            if (state.semanticDiagnosticsPerFile) {
                const cachedDiagnostics = state.semanticDiagnosticsPerFile.get(path);
                if (cachedDiagnostics) {
                    return filterSemanticDiagnostics(cachedDiagnostics, state.compilerOptions);
                }
            }
            const diagnostics = Debug.checkDefined(state.program).getBindAndCheckDiagnostics(sourceFile, cancellationToken);
            if (state.semanticDiagnosticsPerFile) {
                state.semanticDiagnosticsPerFile.set(path, diagnostics);
            }
            return filterSemanticDiagnostics(diagnostics, state.compilerOptions);
        }