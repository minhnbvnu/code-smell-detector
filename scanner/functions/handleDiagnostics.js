function handleDiagnostics(diagnostics, errorFlags, errorType) {
                if (diagnostics.length) {
                    ({ buildResult, step } = buildErrors(state, projectPath, program, config, diagnostics, errorFlags, errorType));
                }
                else {
                    step++;
                }
            }