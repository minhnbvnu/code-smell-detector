function emitFilesAndReportErrorsAndGetExitStatus(program, reportDiagnostic, write, reportSummary, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers) {
            const { emitResult, diagnostics } = emitFilesAndReportErrors(program, reportDiagnostic, write, reportSummary, writeFile2, cancellationToken, emitOnlyDtsFiles, customTransformers);
            if (emitResult.emitSkipped && diagnostics.length > 0) {
                return 1 /* DiagnosticsPresent_OutputsSkipped */;
            }
            else if (diagnostics.length > 0) {
                return 2 /* DiagnosticsPresent_OutputsGenerated */;
            }
            return 0 /* Success */;
        }