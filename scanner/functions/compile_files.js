function compile_files(inputs, options, transformers, host) {
        const program = typescript_1.default.createIncrementalProgram({ rootNames: inputs, options, host });
        const emitted = program.emit(undefined, undefined, undefined, false, transformers);
        const diagnostics = [
            ...program.getConfigFileParsingDiagnostics(),
            ...program.getSyntacticDiagnostics(),
            ...program.getOptionsDiagnostics(),
            ...program.getGlobalDiagnostics(),
            ...program.getSemanticDiagnostics(),
            ...emitted.diagnostics,
        ];
        return diagnostics.length != 0 ? { diagnostics } : {};
    }