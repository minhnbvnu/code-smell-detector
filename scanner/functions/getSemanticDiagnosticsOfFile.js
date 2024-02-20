function getSemanticDiagnosticsOfFile(state, sourceFile, cancellationToken) {
            return concatenate(getBinderAndCheckerDiagnosticsOfFile(state, sourceFile, cancellationToken), Debug.checkDefined(state.program).getProgramDiagnostics(sourceFile));
        }