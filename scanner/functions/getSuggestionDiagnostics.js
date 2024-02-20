function getSuggestionDiagnostics(fileName) {
                synchronizeHostData();
                return computeSuggestionDiagnostics(getValidSourceFile(fileName), program, cancellationToken);
            }