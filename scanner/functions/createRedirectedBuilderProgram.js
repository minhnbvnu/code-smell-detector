function createRedirectedBuilderProgram(getState, configFileParsingDiagnostics) {
            return {
                getState: notImplemented,
                saveEmitState: noop,
                restoreEmitState: noop,
                getProgram,
                getProgramOrUndefined: () => getState().program,
                releaseProgram: () => getState().program = void 0,
                getCompilerOptions: () => getState().compilerOptions,
                getSourceFile: (fileName) => getProgram().getSourceFile(fileName),
                getSourceFiles: () => getProgram().getSourceFiles(),
                getOptionsDiagnostics: (cancellationToken) => getProgram().getOptionsDiagnostics(cancellationToken),
                getGlobalDiagnostics: (cancellationToken) => getProgram().getGlobalDiagnostics(cancellationToken),
                getConfigFileParsingDiagnostics: () => configFileParsingDiagnostics,
                getSyntacticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSyntacticDiagnostics(sourceFile, cancellationToken),
                getDeclarationDiagnostics: (sourceFile, cancellationToken) => getProgram().getDeclarationDiagnostics(sourceFile, cancellationToken),
                getSemanticDiagnostics: (sourceFile, cancellationToken) => getProgram().getSemanticDiagnostics(sourceFile, cancellationToken),
                emit: (sourceFile, writeFile2, cancellationToken, emitOnlyDts, customTransformers) => getProgram().emit(sourceFile, writeFile2, cancellationToken, emitOnlyDts, customTransformers),
                emitBuildInfo: (writeFile2, cancellationToken) => getProgram().emitBuildInfo(writeFile2, cancellationToken),
                getAllDependencies: notImplemented,
                getCurrentDirectory: () => getProgram().getCurrentDirectory(),
                close: noop
            };
            function getProgram() {
                return Debug.checkDefined(getState().program);
            }
        }