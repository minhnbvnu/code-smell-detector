function getDiagnosticText(_message, ..._args) {
            const diagnostic = createCompilerDiagnostic.apply(void 0, arguments);
            return diagnostic.messageText;
        }