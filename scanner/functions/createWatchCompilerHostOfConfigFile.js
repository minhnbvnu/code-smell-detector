function createWatchCompilerHostOfConfigFile({ configFileName, optionsToExtend, watchOptionsToExtend, extraFileExtensions, system, createProgram: createProgram2, reportDiagnostic, reportWatchStatus: reportWatchStatus2 }) {
            const diagnosticReporter = reportDiagnostic || createDiagnosticReporter(system);
            const host = createWatchCompilerHost(system, createProgram2, diagnosticReporter, reportWatchStatus2);
            host.onUnRecoverableConfigFileDiagnostic = (diagnostic) => reportUnrecoverableDiagnostic(system, diagnosticReporter, diagnostic);
            host.configFileName = configFileName;
            host.optionsToExtend = optionsToExtend;
            host.watchOptionsToExtend = watchOptionsToExtend;
            host.extraFileExtensions = extraFileExtensions;
            return host;
        }