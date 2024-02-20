function getDeclarationDiagnosticsForFile(sourceFile, cancellationToken) {
                return sourceFile.isDeclarationFile ? [] : getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
            }