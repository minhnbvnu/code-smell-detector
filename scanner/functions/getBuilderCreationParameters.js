function getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences) {
            let host;
            let newProgram;
            let oldProgram;
            if (newProgramOrRootNames === void 0) {
                Debug.assert(hostOrOptions === void 0);
                host = oldProgramOrHost;
                oldProgram = configFileParsingDiagnosticsOrOldProgram;
                Debug.assert(!!oldProgram);
                newProgram = oldProgram.getProgram();
            }
            else if (isArray(newProgramOrRootNames)) {
                oldProgram = configFileParsingDiagnosticsOrOldProgram;
                newProgram = createProgram({
                    rootNames: newProgramOrRootNames,
                    options: hostOrOptions,
                    host: oldProgramOrHost,
                    oldProgram: oldProgram && oldProgram.getProgramOrUndefined(),
                    configFileParsingDiagnostics,
                    projectReferences
                });
                host = oldProgramOrHost;
            }
            else {
                newProgram = newProgramOrRootNames;
                host = hostOrOptions;
                oldProgram = oldProgramOrHost;
                configFileParsingDiagnostics = configFileParsingDiagnosticsOrOldProgram;
            }
            return { host, newProgram, oldProgram, configFileParsingDiagnostics: configFileParsingDiagnostics || emptyArray };
        }