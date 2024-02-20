function getDiagnosticsWorker(sourceFile) {
                if (sourceFile) {
                    ensurePendingDiagnosticWorkComplete();
                    const previousGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
                    const previousGlobalDiagnosticsSize = previousGlobalDiagnostics.length;
                    checkSourceFileWithEagerDiagnostics(sourceFile);
                    const semanticDiagnostics = diagnostics.getDiagnostics(sourceFile.fileName);
                    const currentGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
                    if (currentGlobalDiagnostics !== previousGlobalDiagnostics) {
                        const deferredGlobalDiagnostics = relativeComplement(previousGlobalDiagnostics, currentGlobalDiagnostics, compareDiagnostics);
                        return concatenate(deferredGlobalDiagnostics, semanticDiagnostics);
                    }
                    else if (previousGlobalDiagnosticsSize === 0 && currentGlobalDiagnostics.length > 0) {
                        return concatenate(currentGlobalDiagnostics, semanticDiagnostics);
                    }
                    return semanticDiagnostics;
                }
                forEach(host.getSourceFiles(), checkSourceFileWithEagerDiagnostics);
                return diagnostics.getDiagnostics();
            }