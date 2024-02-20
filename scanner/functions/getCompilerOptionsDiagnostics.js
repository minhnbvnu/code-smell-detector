function getCompilerOptionsDiagnostics() {
                synchronizeHostData();
                return [...program.getOptionsDiagnostics(cancellationToken), ...program.getGlobalDiagnostics(cancellationToken)];
            }