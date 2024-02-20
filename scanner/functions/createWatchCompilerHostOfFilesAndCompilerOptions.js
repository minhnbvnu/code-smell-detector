function createWatchCompilerHostOfFilesAndCompilerOptions({ rootFiles, options, watchOptions, projectReferences, system, createProgram: createProgram2, reportDiagnostic, reportWatchStatus: reportWatchStatus2 }) {
            const host = createWatchCompilerHost(system, createProgram2, reportDiagnostic || createDiagnosticReporter(system), reportWatchStatus2);
            host.rootFiles = rootFiles;
            host.options = options;
            host.watchOptions = watchOptions;
            host.projectReferences = projectReferences;
            return host;
        }