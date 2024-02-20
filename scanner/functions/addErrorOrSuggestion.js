function addErrorOrSuggestion(isError, diagnostic) {
                if (isError) {
                    diagnostics.add(diagnostic);
                }
                else {
                    suggestionDiagnostics.add({ ...diagnostic, category: 2 /* Suggestion */ });
                }
            }