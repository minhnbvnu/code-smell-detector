function performIncrementalCompilation(input) {
            const system = input.system || sys;
            const host = input.host || (input.host = createIncrementalCompilerHost(input.options, system));
            const builderProgram = createIncrementalProgram(input);
            const exitStatus = emitFilesAndReportErrorsAndGetExitStatus(builderProgram, input.reportDiagnostic || createDiagnosticReporter(system), (s) => host.trace && host.trace(s), input.reportErrorSummary || input.options.pretty ? (errorCount, filesInError) => system.write(getErrorSummaryText(errorCount, filesInError, system.newLine, host)) : void 0);
            if (input.afterProgramEmitAndDiagnostics)
                input.afterProgramEmitAndDiagnostics(builderProgram);
            return exitStatus;
        }