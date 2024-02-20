function createIncrementalProgram({ rootNames, options, configFileParsingDiagnostics, projectReferences, host, createProgram: createProgram2 }) {
            host = host || createIncrementalCompilerHost(options);
            createProgram2 = createProgram2 || createEmitAndSemanticDiagnosticsBuilderProgram;
            const oldProgram = readBuilderProgram(options, host);
            return createProgram2(rootNames, options, host, oldProgram, configFileParsingDiagnostics, projectReferences);
        }