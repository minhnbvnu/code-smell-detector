function createCreateProgramOptions(rootNames, options, host, oldProgram, configFileParsingDiagnostics, typeScriptVersion3) {
            return {
                rootNames,
                options,
                host,
                oldProgram,
                configFileParsingDiagnostics,
                typeScriptVersion: typeScriptVersion3
            };
        }