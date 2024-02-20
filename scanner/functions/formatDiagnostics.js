function formatDiagnostics(diagnostics) {
        return ts.formatDiagnostics(diagnostics, {
            getCanonicalFileName: f => f,
            getCurrentDirectory: process.cwd,
            getNewLine: () => '\n',
        });
    }