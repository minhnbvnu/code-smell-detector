function createEmitAndSemanticDiagnosticsBuilderProgram(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences) {
            return createBuilderProgram(1 /* EmitAndSemanticDiagnosticsBuilderProgram */, getBuilderCreationParameters(newProgramOrRootNames, hostOrOptions, oldProgramOrHost, configFileParsingDiagnosticsOrOldProgram, configFileParsingDiagnostics, projectReferences));
        }