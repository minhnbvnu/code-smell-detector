function getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken) {
                return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedBindAndCheckDiagnosticsForFile, getBindAndCheckDiagnosticsForFileNoCache);
            }