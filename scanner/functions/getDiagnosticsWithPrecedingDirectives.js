function getDiagnosticsWithPrecedingDirectives(sourceFile, commentDirectives, flatDiagnostics) {
                const directives = createCommentDirectivesMap(sourceFile, commentDirectives);
                const diagnostics = flatDiagnostics.filter((diagnostic) => markPrecedingCommentDirectiveLine(diagnostic, directives) === -1);
                return { diagnostics, directives };
            }