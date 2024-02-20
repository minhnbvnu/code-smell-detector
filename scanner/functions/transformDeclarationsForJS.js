function transformDeclarationsForJS(sourceFile, bundled) {
                const oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = (s) => s.errorNode && canProduceDiagnostics(s.errorNode) ? createGetSymbolAccessibilityDiagnosticForNode(s.errorNode)(s) : {
                    diagnosticMessage: s.errorModuleName ? Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit : Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit,
                    errorNode: s.errorNode || sourceFile
                };
                const result = resolver.getDeclarationStatementsForSourceFile(sourceFile, declarationEmitNodeBuilderFlags, symbolTracker, bundled);
                getSymbolAccessibilityDiagnostic = oldDiag;
                return result;
            }