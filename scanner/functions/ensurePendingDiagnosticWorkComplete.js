function ensurePendingDiagnosticWorkComplete() {
                for (const cb of deferredDiagnosticsCallbacks) {
                    cb();
                }
                deferredDiagnosticsCallbacks = [];
            }