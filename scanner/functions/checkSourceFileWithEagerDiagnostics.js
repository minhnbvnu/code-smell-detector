function checkSourceFileWithEagerDiagnostics(sourceFile) {
                ensurePendingDiagnosticWorkComplete();
                const oldAddLazyDiagnostics = addLazyDiagnostic;
                addLazyDiagnostic = (cb) => cb();
                checkSourceFile(sourceFile);
                addLazyDiagnostic = oldAddLazyDiagnostics;
            }