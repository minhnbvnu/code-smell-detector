function getSemanticDiagnostics(fileName) {
                synchronizeHostData();
                const targetSourceFile = getValidSourceFile(fileName);
                const semanticDiagnostics = program.getSemanticDiagnostics(targetSourceFile, cancellationToken);
                if (!getEmitDeclarations(program.getCompilerOptions())) {
                    return semanticDiagnostics.slice();
                }
                const declarationDiagnostics = program.getDeclarationDiagnostics(targetSourceFile, cancellationToken);
                return [...semanticDiagnostics, ...declarationDiagnostics];
            }