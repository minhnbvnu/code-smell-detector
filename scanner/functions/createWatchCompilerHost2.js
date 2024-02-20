function createWatchCompilerHost2(rootFilesOrConfigFileName, options, system, createProgram2, reportDiagnostic, reportWatchStatus2, projectReferencesOrWatchOptionsToExtend, watchOptionsOrExtraFileExtensions) {
            if (isArray(rootFilesOrConfigFileName)) {
                return createWatchCompilerHostOfFilesAndCompilerOptions({
                    rootFiles: rootFilesOrConfigFileName,
                    options,
                    watchOptions: watchOptionsOrExtraFileExtensions,
                    projectReferences: projectReferencesOrWatchOptionsToExtend,
                    system,
                    createProgram: createProgram2,
                    reportDiagnostic,
                    reportWatchStatus: reportWatchStatus2
                });
            }
            else {
                return createWatchCompilerHostOfConfigFile({
                    configFileName: rootFilesOrConfigFileName,
                    optionsToExtend: options,
                    watchOptionsToExtend: projectReferencesOrWatchOptionsToExtend,
                    extraFileExtensions: watchOptionsOrExtraFileExtensions,
                    system,
                    createProgram: createProgram2,
                    reportDiagnostic,
                    reportWatchStatus: reportWatchStatus2
                });
            }
        }