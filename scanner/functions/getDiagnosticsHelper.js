function getDiagnosticsHelper(sourceFile, getDiagnostics2, cancellationToken) {
                if (sourceFile) {
                    return sortAndDeduplicateDiagnostics(getDiagnostics2(sourceFile, cancellationToken));
                }
                return sortAndDeduplicateDiagnostics(flatMap(program.getSourceFiles(), (sourceFile2) => {
                    if (cancellationToken) {
                        cancellationToken.throwIfCancellationRequested();
                    }
                    return getDiagnostics2(sourceFile2, cancellationToken);
                }));
            }