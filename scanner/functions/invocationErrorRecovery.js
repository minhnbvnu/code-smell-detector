function invocationErrorRecovery(apparentType, kind, diagnostic) {
                if (!apparentType.symbol) {
                    return;
                }
                const importNode = getSymbolLinks(apparentType.symbol).originatingImport;
                if (importNode && !isImportCall(importNode)) {
                    const sigs = getSignaturesOfType(getTypeOfSymbol(getSymbolLinks(apparentType.symbol).target), kind);
                    if (!sigs || !sigs.length)
                        return;
                    addRelatedInfo(diagnostic, createDiagnosticForNode(importNode, Diagnostics.Type_originates_at_this_import_A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime_Consider_using_a_default_import_or_import_require_here_instead));
                }
            }