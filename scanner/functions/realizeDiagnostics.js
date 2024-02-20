function realizeDiagnostics(diagnostics, newLine) {
            return diagnostics.map((d) => realizeDiagnostic(d, newLine));
        }