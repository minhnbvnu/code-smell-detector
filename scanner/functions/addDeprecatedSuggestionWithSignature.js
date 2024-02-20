function addDeprecatedSuggestionWithSignature(location, declaration, deprecatedEntity, signatureString) {
                const diagnostic = deprecatedEntity ? createDiagnosticForNode(location, Diagnostics.The_signature_0_of_1_is_deprecated, signatureString, deprecatedEntity) : createDiagnosticForNode(location, Diagnostics._0_is_deprecated, signatureString);
                return addDeprecatedSuggestionWorker(declaration, diagnostic);
            }