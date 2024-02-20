function createDiagnosticForOptionPaths(onKey, key, message, arg0) {
                let needCompilerDiagnostic = true;
                const pathsSyntax = getOptionPathsSyntax();
                for (const pathProp of pathsSyntax) {
                    if (isObjectLiteralExpression(pathProp.initializer) && createOptionDiagnosticInObjectLiteralSyntax(pathProp.initializer, onKey, key, 
                    /*key2*/
                    void 0, message, arg0)) {
                        needCompilerDiagnostic = false;
                    }
                }
                if (needCompilerDiagnostic) {
                    programDiagnostics.add(createCompilerDiagnostic(message, arg0));
                }
            }