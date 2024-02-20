function createDiagnosticForOption(onKey, option1, option2, message, arg0, arg1, arg2, arg3) {
                const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
                const needCompilerDiagnostic = !compilerOptionsObjectLiteralSyntax || !createOptionDiagnosticInObjectLiteralSyntax(compilerOptionsObjectLiteralSyntax, onKey, option1, option2, message, arg0, arg1, arg2, arg3);
                if (needCompilerDiagnostic) {
                    if ("messageText" in message) {
                        programDiagnostics.add(createCompilerDiagnosticFromMessageChain(message));
                    }
                    else {
                        programDiagnostics.add(createCompilerDiagnostic(message, arg0, arg1, arg2, arg3));
                    }
                }
            }