function createDiagnosticReporter(system, pretty) {
            const host = system === sys && sysFormatDiagnosticsHost ? sysFormatDiagnosticsHost : {
                getCurrentDirectory: () => system.getCurrentDirectory(),
                getNewLine: () => system.newLine,
                getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames)
            };
            if (!pretty) {
                return (diagnostic) => system.write(formatDiagnostic(diagnostic, host));
            }
            const diagnostics = new Array(1);
            return (diagnostic) => {
                diagnostics[0] = diagnostic;
                system.write(formatDiagnosticsWithColorAndContext(diagnostics, host) + host.getNewLine());
                diagnostics[0] = void 0;
            };
        }