function getDeclarationDiagnosticsForFileNoCache(sourceFile, cancellationToken) {
                return runWithCancellationToken(() => {
                    const resolver = getTypeChecker().getEmitResolver(sourceFile, cancellationToken);
                    return getDeclarationDiagnostics(getEmitHost(noop), resolver, sourceFile) || emptyArray;
                });
            }