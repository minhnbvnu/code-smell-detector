function handleNoEmitOptions(program, sourceFile, writeFile2, cancellationToken) {
            const options = program.getCompilerOptions();
            if (options.noEmit) {
                program.getSemanticDiagnostics(sourceFile, cancellationToken);
                return sourceFile || outFile(options) ? emitSkippedWithNoDiagnostics : program.emitBuildInfo(writeFile2, cancellationToken);
            }
            if (!options.noEmitOnError)
                return void 0;
            let diagnostics = [
                ...program.getOptionsDiagnostics(cancellationToken),
                ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
                ...program.getGlobalDiagnostics(cancellationToken),
                ...program.getSemanticDiagnostics(sourceFile, cancellationToken)
            ];
            if (diagnostics.length === 0 && getEmitDeclarations(program.getCompilerOptions())) {
                diagnostics = program.getDeclarationDiagnostics(
                /*sourceFile*/
                void 0, cancellationToken);
            }
            if (!diagnostics.length)
                return void 0;
            let emittedFiles;
            if (!sourceFile && !outFile(options)) {
                const emitResult = program.emitBuildInfo(writeFile2, cancellationToken);
                if (emitResult.diagnostics)
                    diagnostics = [...diagnostics, ...emitResult.diagnostics];
                emittedFiles = emitResult.emittedFiles;
            }
            return { diagnostics, sourceMaps: void 0, emittedFiles, emitSkipped: true };
        }