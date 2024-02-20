function getProgramDiagnostics(sourceFile) {
                var _a3;
                if (skipTypeChecking(sourceFile, options, program)) {
                    return emptyArray;
                }
                const programDiagnosticsInFile = programDiagnostics.getDiagnostics(sourceFile.fileName);
                if (!((_a3 = sourceFile.commentDirectives) == null ? void 0 : _a3.length)) {
                    return programDiagnosticsInFile;
                }
                return getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, programDiagnosticsInFile).diagnostics;
            }