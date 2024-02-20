function addErrorOrSuggestionDiagnostic(isError, range, message) {
                const diag2 = createFileDiagnostic(file, range.pos, range.end - range.pos, message);
                if (isError) {
                    file.bindDiagnostics.push(diag2);
                }
                else {
                    file.bindSuggestionDiagnostics = append(file.bindSuggestionDiagnostics, { ...diag2, category: 2 /* Suggestion */ });
                }
            }