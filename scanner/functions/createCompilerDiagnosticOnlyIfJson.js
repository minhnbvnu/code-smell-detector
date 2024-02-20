function createCompilerDiagnosticOnlyIfJson(message, arg0, arg1) {
                if (!sourceFile) {
                    errors.push(createCompilerDiagnostic(message, arg0, arg1));
                }
            }