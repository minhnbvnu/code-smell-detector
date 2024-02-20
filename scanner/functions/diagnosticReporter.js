function diagnosticReporter(diagnostic) {
        throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, ts.sys.newLine));
    }