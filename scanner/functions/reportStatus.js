function reportStatus(state, message, ...args) {
            state.host.reportSolutionBuilderStatus(createCompilerDiagnostic(message, ...args));
        }