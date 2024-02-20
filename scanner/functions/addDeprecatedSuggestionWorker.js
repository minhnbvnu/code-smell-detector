function addDeprecatedSuggestionWorker(declarations, diagnostic) {
                const deprecatedTag = Array.isArray(declarations) ? forEach(declarations, getJSDocDeprecatedTag) : getJSDocDeprecatedTag(declarations);
                if (deprecatedTag) {
                    addRelatedInfo(diagnostic, createDiagnosticForNode(deprecatedTag, Diagnostics.The_declaration_was_marked_as_deprecated_here));
                }
                suggestionDiagnostics.add(diagnostic);
                return diagnostic;
            }