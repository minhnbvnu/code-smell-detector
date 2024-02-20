function lookupOrIssueError(location, message, arg0, arg1, arg2, arg3) {
                const diagnostic = location ? createDiagnosticForNode(location, message, arg0, arg1, arg2, arg3) : createCompilerDiagnostic(message, arg0, arg1, arg2, arg3);
                const existing = diagnostics.lookup(diagnostic);
                if (existing) {
                    return existing;
                }
                else {
                    diagnostics.add(diagnostic);
                    return diagnostic;
                }
            }