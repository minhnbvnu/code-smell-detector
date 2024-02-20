function addDeprecatedSuggestion(location, declarations, deprecatedEntity) {
                const diagnostic = createDiagnosticForNode(location, Diagnostics._0_is_deprecated, deprecatedEntity);
                return addDeprecatedSuggestionWorker(declarations, diagnostic);
            }