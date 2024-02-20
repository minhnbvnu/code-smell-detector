function removeSemanticDiagnosticsOf(state, path) {
            if (!state.semanticDiagnosticsFromOldState) {
                return true;
            }
            state.semanticDiagnosticsFromOldState.delete(path);
            state.semanticDiagnosticsPerFile.delete(path);
            return !state.semanticDiagnosticsFromOldState.size;
        }