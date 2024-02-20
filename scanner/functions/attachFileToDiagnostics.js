function attachFileToDiagnostics(diagnostics, file) {
            const diagnosticsWithLocation = [];
            for (const diagnostic of diagnostics) {
                diagnosticsWithLocation.push(attachFileToDiagnostic(diagnostic, file));
            }
            return diagnosticsWithLocation;
        }