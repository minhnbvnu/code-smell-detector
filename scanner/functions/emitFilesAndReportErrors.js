function emitFilesAndReportErrors(program, reportDiagnostic, write, reportSummary, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers) {
            const isListFilesOnly = !!program.getCompilerOptions().listFilesOnly;
            const allDiagnostics = program.getConfigFileParsingDiagnostics().slice();
            const configFileParsingDiagnosticsLength = allDiagnostics.length;
            addRange(allDiagnostics, program.getSyntacticDiagnostics(
            /*sourceFile*/
            void 0, cancellationToken));
            if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
                addRange(allDiagnostics, program.getOptionsDiagnostics(cancellationToken));
                if (!isListFilesOnly) {
                    addRange(allDiagnostics, program.getGlobalDiagnostics(cancellationToken));
                    if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
                        addRange(allDiagnostics, program.getSemanticDiagnostics(
                        /*sourceFile*/
                        void 0, cancellationToken));
                    }
                }
            }
            const emitResult = isListFilesOnly ? { emitSkipped: true, diagnostics: emptyArray } : program.emit(
            /*targetSourceFile*/
            void 0, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers);
            const { emittedFiles, diagnostics: emitDiagnostics } = emitResult;
            addRange(allDiagnostics, emitDiagnostics);
            const diagnostics = sortAndDeduplicateDiagnostics(allDiagnostics);
            diagnostics.forEach(reportDiagnostic);
            if (write) {
                const currentDir = program.getCurrentDirectory();
                forEach(emittedFiles, (file) => {
                    const filepath = getNormalizedAbsolutePath(file, currentDir);
                    write(`TSFILE: ${filepath}`);
                });
                listFiles(program, write);
            }
            if (reportSummary) {
                reportSummary(getErrorCountForSummary(diagnostics), getFilesInErrorForSummary(diagnostics));
            }
            return {
                emitResult,
                diagnostics
            };
        }