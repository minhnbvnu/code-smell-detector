function reportParseConfigFileDiagnostic(state, proj) {
            reportAndStoreErrors(state, proj, [state.configFileCache.get(proj)]);
        }