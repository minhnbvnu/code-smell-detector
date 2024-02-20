function getSemanticDiagnosticsForFile(sourceFile, cancellationToken) {
                return concatenate(filterSemanticDiagnostics(getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken), options), getProgramDiagnostics(sourceFile));
            }