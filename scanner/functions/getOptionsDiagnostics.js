function getOptionsDiagnostics() {
                return sortAndDeduplicateDiagnostics(concatenate(programDiagnostics.getGlobalDiagnostics(), getOptionsDiagnosticsOfConfigFile()));
            }