function getBreakpointStatementAtPosition(fileName, position) {
                const sourceFile = syntaxTreeCache.getCurrentSourceFile(fileName);
                return ts_BreakpointResolver_exports.spanInSourceFileAtLocation(sourceFile, position);
            }