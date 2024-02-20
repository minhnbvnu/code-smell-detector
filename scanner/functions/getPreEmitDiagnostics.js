function getPreEmitDiagnostics(program, sourceFile, cancellationToken) {
            let diagnostics;
            diagnostics = addRange(diagnostics, program.getConfigFileParsingDiagnostics());
            diagnostics = addRange(diagnostics, program.getOptionsDiagnostics(cancellationToken));
            diagnostics = addRange(diagnostics, program.getSyntacticDiagnostics(sourceFile, cancellationToken));
            diagnostics = addRange(diagnostics, program.getGlobalDiagnostics(cancellationToken));
            diagnostics = addRange(diagnostics, program.getSemanticDiagnostics(sourceFile, cancellationToken));
            if (getEmitDeclarations(program.getCompilerOptions())) {
                diagnostics = addRange(diagnostics, program.getDeclarationDiagnostics(sourceFile, cancellationToken));
            }
            return sortAndDeduplicateDiagnostics(diagnostics || emptyArray);
        }