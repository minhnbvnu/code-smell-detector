function getDeclarationDiagnosticsWorker(sourceFile, cancellationToken) {
                return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedDeclarationDiagnosticsForFile, getDeclarationDiagnosticsForFileNoCache);
            }