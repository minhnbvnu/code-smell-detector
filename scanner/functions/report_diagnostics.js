function report_diagnostics(diagnostics) {
        const errors = typescript_1.default.sortAndDeduplicateDiagnostics(diagnostics);
        const text = typescript_1.default.formatDiagnosticsWithColorAndContext(errors, diagnostics_host);
        return { count: errors.length, text };
    }