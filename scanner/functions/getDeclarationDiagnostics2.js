function getDeclarationDiagnostics2(sourceFile, cancellationToken) {
                const options2 = program.getCompilerOptions();
                if (!sourceFile || outFile(options2)) {
                    return getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
                }
                else {
                    return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
                }
            }