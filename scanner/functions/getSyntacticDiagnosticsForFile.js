function getSyntacticDiagnosticsForFile(sourceFile) {
                if (isSourceFileJS(sourceFile)) {
                    if (!sourceFile.additionalSyntacticDiagnostics) {
                        sourceFile.additionalSyntacticDiagnostics = getJSSyntacticDiagnosticsForFile(sourceFile);
                    }
                    return concatenate(sourceFile.additionalSyntacticDiagnostics, sourceFile.parseDiagnostics);
                }
                return sourceFile.parseDiagnostics;
            }