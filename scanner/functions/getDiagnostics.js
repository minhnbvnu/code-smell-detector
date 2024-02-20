function getDiagnostics({ program, sourceFile, cancellationToken }) {
            return [
                ...program.getSemanticDiagnostics(sourceFile, cancellationToken),
                ...program.getSyntacticDiagnostics(sourceFile, cancellationToken),
                ...computeSuggestionDiagnostics(sourceFile, program, cancellationToken)
            ];
        }