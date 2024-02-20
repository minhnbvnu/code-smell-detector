function createWatchCompilerHost(system = sys, createProgram2, reportDiagnostic, reportWatchStatus2) {
            const write = (s) => system.write(s + system.newLine);
            const result = createProgramHost(system, createProgram2);
            copyProperties(result, createWatchHost(system, reportWatchStatus2));
            result.afterProgramCreate = (builderProgram) => {
                const compilerOptions = builderProgram.getCompilerOptions();
                const newLine = getNewLineCharacter(compilerOptions);
                emitFilesAndReportErrors(builderProgram, reportDiagnostic, write, (errorCount) => result.onWatchStatusChange(createCompilerDiagnostic(getWatchErrorSummaryDiagnosticMessage(errorCount), errorCount), newLine, compilerOptions, errorCount));
            };
            return result;
        }