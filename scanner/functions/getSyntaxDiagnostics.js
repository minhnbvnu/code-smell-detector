function getSyntaxDiagnostics(cancellationToken) {
                Debug.assertIsDefined(program);
                handleDiagnostics([
                    ...program.getConfigFileParsingDiagnostics(),
                    ...program.getOptionsDiagnostics(cancellationToken),
                    ...program.getGlobalDiagnostics(cancellationToken),
                    ...program.getSyntacticDiagnostics(
                    /*sourceFile*/
                    void 0, cancellationToken)
                ], 8 /* SyntaxErrors */, "Syntactic");
            }